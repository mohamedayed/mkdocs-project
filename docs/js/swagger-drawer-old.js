document.addEventListener("DOMContentLoaded", async function () {
    const drawer = document.getElementById("swagger-drawer");
    const openBtn = document.getElementById("open-swagger-drawer");
    const closeBtn = document.getElementById("close-swagger-drawer");
  
    if (openBtn && drawer) {
      openBtn.addEventListener("click", () => {
        drawer.classList.add("open");
      });
    }
  
    if (closeBtn && drawer) {
      closeBtn.addEventListener("click", () => {
        drawer.classList.remove("open");
      });
    }
  
    try {
      const res = await fetch("/assets/forsa.json");
      const originalSwagger = await res.json();
  
      const filteredSwagger = JSON.parse(JSON.stringify(originalSwagger));
  
      Object.entries(originalSwagger.paths).forEach(([path, methods]) => {
        const filteredMethods = {};
  
        for (const [method, details] of Object.entries(methods)) {
            //Filter by 
            filteredMethods[method] = details;
        //   if (details.tags?.includes("user-resource")) {
        //     filteredMethods[method] = details;
        //   }
        }
  
        if (Object.keys(filteredMethods).length > 0) {
          filteredSwagger.paths[path] = filteredMethods;
        } else {
          delete filteredSwagger.paths[path];
        }
      });
  
      SwaggerUIBundle({
        spec: filteredSwagger,
        dom_id: '#swagger-ui',
        presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
        layout: "BaseLayout"
      });
    } catch (err) {
      console.error("❌ Failed to load or filter Swagger spec:", err);
    }
  });
  