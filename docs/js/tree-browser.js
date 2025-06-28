function createTreeNode(category) {
    const li = document.createElement("li");
  
    const details = document.createElement("details");
    details.open = false;
  
    const summary = document.createElement("summary");
    summary.textContent = category.name || "بدون اسم";
  
    details.appendChild(summary);
  
    const ul = document.createElement("ul");
  
    // Add services
    if (category.services) {
      category.services.forEach(service => {
        const serviceLi = document.createElement("li");
        serviceLi.textContent = service.serviceName || "🧾 خدمة";
        ul.appendChild(serviceLi);
      });
    }
  
    // Add subcategories
    if (category.serviceCategory) {
      category.serviceCategory.forEach(sub => {
        ul.appendChild(createTreeNode(sub));
      });
    }
  
    details.appendChild(ul);
    li.appendChild(details);
    return li;
  }
  
  async function buildServiceTree() {
    const container = document.getElementById("serviceTree");
    if (!container) return;
  
    try {
      const response = await fetch("/assets/data/services.json");
      const json = await response.json();
      const categories = json.serviceList?.serviceCategory || [];
  
      const treeRoot = document.createElement("ul");
      treeRoot.classList.add("tree");
  
      categories.forEach(cat => {
        treeRoot.appendChild(createTreeNode(cat));
      });
  
      container.appendChild(treeRoot);
    } catch (e) {
      console.error("❌ JSON load failed", e);
    }
  }
  
  document.addEventListener("DOMContentLoaded", buildServiceTree);
  