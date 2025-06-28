async function loadParentCategories() {
    const container = document.getElementById("parentCategoriesGrid");
    if (!container) return;
  
    try {
      const res = await fetch("/assets/data/services.json");
      const json = await res.json();
      const parents = json.serviceList?.serviceCategory || [];
  
      parents.forEach(cat => {
        const card = document.createElement("div");
        card.className = "compact-card";

        card.innerHTML = `
          <div class="compact-card-icon">
            <span class="material-symbols-rounded">folder</span>
          </div>
          <div class="compact-card-content">
            <div class="compact-card-title">${cat.name || "بدون اسم"}</div>
            <div class="compact-card-description">تصنيف رئيسي يحتوي على خدمات فرعية.</div>
          </div>
        `;
        
  
        container.appendChild(card);
      });
    } catch (e) {
      console.error("❌ Failed to load parent categories", e);
    }
  }
  
  document.addEventListener("DOMContentLoaded", loadParentCategories);
  