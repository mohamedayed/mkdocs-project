document.addEventListener("DOMContentLoaded", buildServiceTree);

async function buildServiceTree() {
  const treeContainer = document.getElementById("tree-container");
  if (!treeContainer) return;
  treeContainer.innerHTML = "";

  try {
    const response = await fetch("/assets/data/services.json");
    const json = await response.json();
    const categories = json.serviceList?.serviceCategory || [];

    for (const category of categories) {
      const node = createCategoryNode(category);
      treeContainer.appendChild(node);
    }
  } catch (error) {
    console.error("❌ Failed to load services.json", error);
  }
}

function createCategoryNode(category) {
  const categoryNode = document.createElement('div');
  categoryNode.className = 'tree-node';

  const categoryHeader = document.createElement('div');
  categoryHeader.className = 'tree-header';
  categoryHeader.innerHTML = `
    <span class="toggle-icon">▶</span>
    <span class="node-icon">📁</span>
    <span class="node-name">${category.name || 'Unnamed Category'}</span>
    <span class="node-count">${(category.services?.length || 0) + (category.serviceCategory?.length || 0)}</span>
  `;

  const categoryContent = document.createElement('div');
  categoryContent.className = 'tree-content';

  if (Array.isArray(category.services)) {
    for (const svc of category.services) {
      const item = document.createElement('div');
      item.className = 'device-item';
      item.innerHTML = `
        <span class="device-icon">🧾</span>
        <span class="device-name">${svc.serviceName}</span>
        <span class="device-status status-online"></span>
      `;
      item.addEventListener("click", () => {
        showServiceDetails(svc, category.name);
      });
      categoryContent.appendChild(item);
    }
  }

  if (Array.isArray(category.serviceCategory)) {
    for (const sub of category.serviceCategory) {
      const subNode = createCategoryNode(sub);
      categoryContent.appendChild(subNode);
    }
  }

  categoryNode.appendChild(categoryHeader);
  categoryNode.appendChild(categoryContent);

  categoryHeader.addEventListener('click', function () {
    this.classList.toggle('expanded');
  });

  return categoryNode;
}

function showServiceDetails(service, categoryName) {
  const details = document.getElementById('device-details');
  const backdrop = document.getElementById('drawer-backdrop');
  details.classList.add("active");
  backdrop.classList.add("show");

  details.querySelector('.device-detail-name').textContent = service.serviceName || "Unnamed";
  details.querySelector('.device-detail-location').textContent = categoryName || "Unknown Category";
  details.querySelector('.device-detail-status span').textContent = `ID: ${service.serviceID || "N/A"}`;
}

document.getElementById('close-details').addEventListener("click", () => {
  document.getElementById('device-details').classList.remove("active");
  document.getElementById('drawer-backdrop').classList.remove("show");
});

document.getElementById('drawer-backdrop').addEventListener("click", () => {
  document.getElementById('device-details').classList.remove("active");
  document.getElementById('drawer-backdrop').classList.remove("show");
});
