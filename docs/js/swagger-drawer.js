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
        const swaggerData = sessionStorage.getItem("openApiSpec");
        if (!swaggerData) {
            throw new Error("No OpenAPI spec found in sessionStorage");
        }

        const originalSwagger = JSON.parse(swaggerData);
        const filteredSwagger = JSON.parse(JSON.stringify(originalSwagger));

        Object.entries(originalSwagger.paths || {}).forEach(([path, methods]) => {
            const filteredMethods = {};
            for (const [method, details] of Object.entries(methods)) {
                filteredMethods[method] = details;
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
        console.error("❌ Failed to load or render Swagger spec:", err);
        document.getElementById("swagger-ui").innerHTML = "<p style='color:red;'>Failed to load Swagger data.</p>";
    }
});
