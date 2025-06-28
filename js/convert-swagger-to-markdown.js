document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("swagger-markdown-output");
  
    try {
      const rawDocs = sessionStorage.getItem("serviceDocs");
      const serviceName = sessionStorage.getItem("serviceName") || "Unnamed Service";
  
      if (!rawDocs) throw new Error("❌ No Swagger data in sessionStorage");
  
      const docs = JSON.parse(rawDocs);
      const swagger = convertDocsToOpenApi(docs, serviceName); // 👈 Convert into OpenAPI spec
      const schemas = swagger.components?.schemas || {};
      let html = "";
  
      for (const [path, methods] of Object.entries(swagger.paths)) {
        html += `<div class="api-block">`;
  
        for (const [method, info] of Object.entries(methods)) {
          const methodUpper = method.toUpperCase();
  
          html += `
            <div class="swagger-bar">
              <div class="swagger-bar-left">
                <span class="method-label ${method.toLowerCase()}">${methodUpper}</span>
                <code class="swagger-url">https://api.momkn.com${path}</code>
              </div>
              <button class="swagger-bar-button" onclick="openSwaggerDrawer()">Try it</button>
            </div>
  
            <div class="api-method">
              <div class="api-method-header">
                <strong>${info.summary || "No summary available"}</strong>
              </div>
          `;
  
          if (info.requestBody) {
            const content = info.requestBody.content?.["application/json"];
            const schema = resolveSchema(content?.schema, schemas);
            html += `
              <div class="api-section">
                <div class="api-label">📥 Request Body</div>
                ${renderSchemaFields(schema)}
              </div>
            `;
          }
  
          if (info.responses) {
            html += `<div class="api-section"><div class="api-label">📤 Response</div>`;
  
            for (const [code, resp] of Object.entries(info.responses)) {
              const schema = resolveSchema(resp.content?.["application/json"]?.schema, schemas);
              html += `
                <div class="api-response-block">
                  <strong>${code}</strong>: ${resp.description || "No description"}
                  ${schema ? renderSchemaFields(schema) : ""}
                </div>
              `;
            }
  
            html += `</div>`;
          }
  
          html += `</div>`; // api-method
        }
  
        html += `</div>`; // api-block
      }
  
      container.innerHTML = html;
  
      // Store spec globally for Swagger drawer
      window._latestOpenApiSpec = swagger;
    } catch (err) {
      container.innerText = "❌ Failed to load Swagger JSON.";
      console.error(err);
    }
  
    window.openSwaggerDrawer = function () {
      const drawer = document.getElementById("swagger-drawer");
      if (!drawer) return;
  
      drawer.classList.add("open");
  
      // Load Swagger UI with current OpenAPI spec
      if (window._latestOpenApiSpec) {
        SwaggerUIBundle({
          spec: window._latestOpenApiSpec,
          dom_id: "#swagger-ui",
          layout: "BaseLayout",
          presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
        });
      }
    };
  
    function resolveSchema(schema, components) {
      if (!schema) return null;
      if (schema.$ref) {
        const refPath = schema.$ref.replace("#/components/schemas/", "");
        return components[refPath] || null;
      }
      return schema;
    }
  
    function renderSchemaFields(schema) {
      if (!schema || !schema.properties) return "<p>No schema available.</p>";
      let html = `<div class="schema-fields">`;
  
      for (const [key, val] of Object.entries(schema.properties)) {
        const type = val.type || "object";
        const description = val.description || "";
        const isRequired = (schema.required || []).includes(key);
  
        html += `
          <div class="schema-field">
            <div class="schema-key-type-row">
              <span class="schema-key-tag">${key}</span>
              <span class="schema-type">${type}${isRequired ? " (required)" : ""}</span>
            </div>
            ${description ? `<div class="schema-description">${description}</div>` : ""}
          </div>
        `;
      }
  
      html += `</div>`;
      return html;
    }
  });
  
  // Handle drawer close
  document.addEventListener("DOMContentLoaded", () => {
    const closeBtn = document.getElementById("close-swagger-drawer");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        const drawer = document.getElementById("swagger-drawer");
        if (drawer) drawer.classList.remove("open");
      });
    }
  });
  