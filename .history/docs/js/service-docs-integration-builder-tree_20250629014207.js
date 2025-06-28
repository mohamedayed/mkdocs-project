const servicesFlatList = [];

document.addEventListener("DOMContentLoaded", () => {
  buildServiceDocsTree();
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", handleSearch);
});

async function buildServiceDocsTree() {
  const container = document.getElementById("tree-container");
  if (!container) return;
  container.innerHTML = "";
  servicesFlatList.length = 0; // clear before rebuilding

  try {
    const indexResponse = await fetch("assets/output/index.json");
    const fileList = await indexResponse.json();

    for (const { name, file } of fileList) {
      const fileResponse = await fetch(`/assets/output/${file}`);
      const json = await fileResponse.json();
      const node = createNodeFromCategory(json, name,true);
      container.appendChild(node);
    }

    console.log("✅ servicesFlatList contains:", servicesFlatList.length, "items", servicesFlatList);
  } catch (error) {
    console.error("❌ Failed to build service tree", error);
  }
}

function createNodeFromCategory(category, parentLabel = "",isRoot = false) {


  if (
    category.lastNode === false &&
    Array.isArray(category.serviceCategory) &&
    category.serviceCategory.length === 1 &&
    category.serviceCategory[0].lastNode === true &&
    Array.isArray(category.serviceCategory[0].services) &&
    category.serviceCategory[0].services.length === 1 &&
    category.name.toLowerCase() === category.serviceCategory[0].services[0].serviceName.toLowerCase()
  ) {
    const singleService = category.serviceCategory[0].services[0];
  
    const wrapper = document.createElement("div");
    wrapper.className = "tree-node";
  
    const header = document.createElement("div");
    header.className = "tree-header special-leaf-clickable"; // optional class if you want custom style
    header.innerHTML = `
      <span class="node-icon">📁</span>
      <span class="node-name">${category.name}</span>
      <span class="">→</span>


    `;
  
    header.addEventListener("click", () => {
      showServiceDetails(singleService, category.name);
    });
  
    wrapper.appendChild(header);
    return wrapper;
  }
  
  if (
    category.lastNode === true &&
    Array.isArray(category.services) &&
    category.services.length === 1 &&
    category.name === category.services[0].serviceName
  ) {
    const service = category.services[0];

    const item = document.createElement("div");
    item.className = "device-item";
    item.innerHTML = `
      <span class="device-icon">📄</span>
      <span class="device-name">${category.name}</span>
      <span class="device-status status-online"></span>
    `;
    item.addEventListener("click", () => {
      showServiceDetails(service, category.name);
    });

    // Push to flat list for search
    servicesFlatList.push({
      name: service.serviceName,
      data: service,
      category: category.name,
    });

    return item; // 🔁 Return directly — don’t build expandable tree
  }


  const wrapper = document.createElement("div");
  wrapper.className = "tree-node"; // No .expanded by default

  const header = document.createElement("div");
  header.className = "tree-header";
  header.innerHTML = `
    <span class="toggle-icon">▶</span>
    <span class="node-icon">📁</span>
    <span class="node-name">${category.name || parentLabel}</span>
    <span class="node-count">${(category.services?.length || 0) + (category.serviceCategory?.length || 0)}</span>
  `;

  const content = document.createElement("div");
  content.className = "tree-content"; // collapsible section


  const totalChildren =
  (category.services?.length || 0) + (category.serviceCategory?.length || 0);

  let filterInput;
  console.log("aywa"+totalChildren)

  if (totalChildren > 6 && isRoot) {
    filterInput = document.createElement("input");
    filterInput.type = "text";
    filterInput.placeholder = "Filter services...";
    filterInput.className = "service-filter-input";
    filterInput.style.display = "none"; // hide initially
  
    filterInput.addEventListener("input", () => {
      const keyword = filterInput.value.trim().toLowerCase();
      Array.from(content.querySelectorAll(".tree-node, .device-item")).forEach(child => {
        const text = child.querySelector(".node-name, .device-name")?.textContent.toLowerCase() || "";
        child.style.display = text.includes(keyword) ? "" : "none";
      });
    });
  
    // Inject input between header and content
    wrapper.appendChild(filterInput);
  }
  


  // Add services (leaves)
  if (Array.isArray(category.services) && category.services.length > 0) {
    const grid = document.createElement("div");
    grid.className = "grid-wrapper";

    for (const service of category.services) {
      servicesFlatList.push({
        name: service.serviceName,
        data: service,
        category: category.name || parentLabel,
      });

      const item = document.createElement("div");
      item.className = "device-item";
      item.innerHTML = `
        <span class="device-icon">📄</span>
        <span class="device-name">${service.serviceName}</span>
        <span class="device-status status-online"></span>
      `;
      item.addEventListener("click", () =>
        showServiceDetails(service, category.name)
      );

      grid.appendChild(item);
    }

    content.appendChild(grid);
  }

  // Add subcategories (nested nodes)
  if (Array.isArray(category.serviceCategory) && category.serviceCategory.length > 0) {
    for (const sub of category.serviceCategory) {
      const subNode = createNodeFromCategory(sub, category.name || parentLabel,false);
      content.appendChild(subNode); // collapsed subcategory node
    }
  }
  wrapper.appendChild(header);
  if (filterInput) wrapper.appendChild(filterInput); // only insert if created
  wrapper.appendChild(content);
  

  // Expand/collapse this node only when header clicked
  header.addEventListener("click", () => {
    const isNowExpanded = wrapper.classList.toggle("expanded");
    if (filterInput) {
      filterInput.style.display = isNowExpanded ? "block" : "none";
    }
  });
  

  return wrapper;
}


// function createNodeFromCategory(category, parentLabel = "") {
//   const wrapper = document.createElement("div");
//   wrapper.className = "tree-node";

//   const header = document.createElement("div");
//   header.className = "tree-header";
//   header.innerHTML = `
//     <span class="toggle-icon">▶</span>
//     <span class="node-icon">📁</span>
//     <span class="node-name">${category.name || parentLabel}</span>
//     <span class="node-count">${(category.services?.length || 0) + (category.serviceCategory?.length || 0)}</span>
//   `;

//   const content = document.createElement("div");
//   content.className = "tree-content";

//   if (Array.isArray(category.services) && category.services.length > 0) {
//     const grid = document.createElement("div");
//     grid.className = "grid-wrapper";

//     for (const service of category.services) {
//       if (!service || !service.serviceName) continue;
//       servicesFlatList.push({
//         name: service.serviceName,
//         data: service,
//         category: category.name || parentLabel
//       });

//       const item = document.createElement("div");
//       item.className = "device-item";
//       item.innerHTML = `
//         <span class="device-icon">📄</span>
//         <span class="device-name">${service.serviceName}</span>
//         <span class="device-status status-online"></span>
//       `;
//       item.addEventListener("click", () => {
//         showServiceDetails(service, category.name);
//       });
//       grid.appendChild(item);
//     }

//     content.appendChild(grid);
//   }

//   if (Array.isArray(category.serviceCategory) && category.serviceCategory.length > 0) {
//     const horizontalScroller = document.createElement("div");
//     horizontalScroller.style.display = "flex";
//     horizontalScroller.style.overflowY= "auto";
//     horizontalScroller.style.gap = "12px";
//     horizontalScroller.style.padding = "10px 4px";
  
//     for (const sub of category.serviceCategory) {
//       const subNode = createNodeFromCategory(sub, category.name || parentLabel);
//       horizontalScroller.appendChild(subNode);
//     }
  
//     content.appendChild(horizontalScroller);
//   }
  

//   wrapper.appendChild(header);
//   wrapper.appendChild(content);

//   header.addEventListener("click", () => {
//     wrapper.classList.toggle("expanded");
//   });
  
//   // header.addEventListener("click", () => {
//   //   document.querySelectorAll(".tree-node.expanded").forEach(node => {
//   //     if (node !== wrapper) node.classList.remove("expanded");
//   //   });
//   //   wrapper.classList.toggle("expanded");
//   // });

//   return wrapper;
// }

function handleSearch(e) {
  const keyword = e.target.value.trim().toLowerCase();
  const container = document.getElementById("tree-container");
  container.innerHTML = "";

  if (keyword === "") {
    buildServiceDocsTree();
    return;
  }

  const matched = servicesFlatList.filter(service =>
    normalizeText(service.name).includes(normalizeText(keyword))

    //service.name.toLowerCase().includes(keyword)
  );

  if (matched.length === 0) {
    container.innerHTML = "<p style='color:var(--accent-teal); padding: 20px;'>No services found.</p>";
    return;
  }

  const grid = document.createElement("div");
  grid.className = "grid-wrapper";

  for (const { name, data, category } of matched) {
    const item = document.createElement("div");
    item.className = "device-item";
    item.innerHTML = `
      <span class="device-icon">📄</span>
      <span class="device-name">${name}</span>
      <span class="device-status status-online"></span>
    `;
    item.addEventListener("click", () => showServiceDetails(data, category));
    grid.appendChild(item);
  }

  container.appendChild(grid);
}
function normalizeText(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function showServiceDetails(service, categoryName) {
  try {
    sessionStorage.setItem("serviceDocs", JSON.stringify(service.docs || {}));
    sessionStorage.setItem("serviceName", service.serviceName || "Unnamed");
    sessionStorage.setItem("openApiSpec", JSON.stringify(convertDocsToOpenApi(service.docs)));
  } catch (e) {
    console.error("❌ Failed to save to sessionStorage", e);
  }

  setTimeout(() => {
    window.location.href = "../generic/";
  }, 200);
}

document.getElementById('close-details')?.addEventListener("click", () => {
  document.getElementById('device-details')?.classList.remove("active");
  document.getElementById('drawer-backdrop')?.classList.remove("show");
});
document.getElementById('drawer-backdrop')?.addEventListener("click", () => {
  document.getElementById('device-details')?.classList.remove("active");
  document.getElementById('drawer-backdrop')?.classList.remove("show");
});
