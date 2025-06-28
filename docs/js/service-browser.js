function flattenServices(tree) {
  const services = [];
  function walk(node, parentName = '') {
    if (node.services?.length) {
      node.services.forEach(s => {
        s.category = parentName;
        services.push(s);
      });
    }
    if (node.serviceCategory) {
      node.serviceCategory.forEach(cat => {
        walk(cat, cat.name);
      });
    }
  }
  walk(tree);
  return services;
}

function createServiceItem(service) {
  const item = document.createElement("div");
  item.className = "service-item";
  item.innerHTML = `
    <span class="icon">🧾</span>
    <span class="name">${service.serviceName?.trim() || 'خدمة بدون اسم'}</span>
    <small style="float: left; opacity: 0.6;">${service.category || ''}</small>
  `;
  item.onclick = () => showServiceCard(service);
  return item;
}

function showServiceCard(service) {
  const card = document.getElementById("serviceContent");
  const title = document.getElementById("serviceTitle");
  const info = document.getElementById("serviceInfo");
  const params = document.getElementById("serviceParams");

  title.textContent = service.serviceName;
  info.innerHTML = `<strong>المبلغ:</strong> ${service.minValue} إلى ${service.maxValue} ${service.currency}<br/><strong>معرّف الخدمة:</strong> ${service.serviceID}`;

  params.innerHTML = '';
  if (service.serviceParameter?.length) {
    const ul = document.createElement("ul");
    service.serviceParameter.forEach(p => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${p.label}</strong>: ${p.title}`;
      ul.appendChild(li);
    });
    params.appendChild(ul);
  }

  card.classList.remove("hidden");
  card.scrollIntoView({ behavior: "smooth" });
}

async function loadServices() {
  const res = await fetch("/assets/data/services.json");
  const json = await res.json();
  const services = flattenServices(json.serviceList);
  const search = document.getElementById("serviceSearch");
  const result = document.getElementById("serviceResults");

  function renderList(filter = "") {
    result.innerHTML = '';
    const filtered = services.filter(s => s.serviceName?.includes(filter));
    if (!filtered.length) {
      result.innerHTML = `<div class="service-item">لا توجد خدمات مطابقة.</div>`;
      return;
    }
    filtered.forEach(s => result.appendChild(createServiceItem(s)));
  }

  renderList();

  search.addEventListener("input", () => {
    renderList(search.value.trim());
  });
}

document.addEventListener("DOMContentLoaded", loadServices);
