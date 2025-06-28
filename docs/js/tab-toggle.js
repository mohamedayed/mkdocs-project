function showTab(tab) {
    const tabs = {
      popular: document.getElementById("tab-popular"),
      all: document.getElementById("tab-all-services")
    };
  
    Object.entries(tabs).forEach(([key, el]) => {
      if (el) el.style.display = key === tab ? "block" : "none";
    });
  
    document.querySelectorAll(".tab-button").forEach(btn => {
      const isActive = btn.dataset.tab === tab;
      btn.classList.toggle("is-active", isActive);
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".service-tab-controls").forEach((controlGroup) => {
      const buttons = controlGroup.querySelectorAll(".tab-button");
      const contentGroup = controlGroup.nextElementSibling?.parentNode;
  
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const selected = btn.dataset.tab;
  
          // Update active button
          buttons.forEach(b => b.classList.toggle("is-active", b === btn));
  
          // Update content visibility
          contentGroup.querySelectorAll(".service-tab-content").forEach(content => {
            content.classList.toggle("is-visible", content.classList.contains(selected));
          });
        });
      });
    });
  });
  