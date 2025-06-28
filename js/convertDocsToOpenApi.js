function inferSchemaFromExample(example) {
    const schema = { type: "object", properties: {} };
    if (!example || typeof example !== "object") return schema;
  
    for (const [key, value] of Object.entries(example)) {
      const type = Array.isArray(value) ? "array" : typeof value;
  
      schema.properties[key] = {
        type: type === "number" && Number.isInteger(value) ? "integer" : type
      };
  
      if (type === "array" && value.length > 0 && typeof value[0] === "object") {
        schema.properties[key].items = inferSchemaFromExample(value[0]);
      }
    }
  
    return schema;
  }
  
  function convertDocsToOpenApi(docs, serviceName = "Untitled Service") {
    const openApiSpec = {
      openapi: "3.0.1",
      info: {
        title: serviceName,
        version: "1.0.0",
        description: `Auto-generated documentation for ${serviceName}`
      },
      paths: {},
      components: { schemas: {} },
    };
  
    for (const [operation, content] of Object.entries(docs)) {
      const lowerOp = operation.toLowerCase();
      const path = `/services/{serviceId}/${lowerOp}`;
  
      const requestExample = content.request || {};
      const responseExample = content.response || {};
  
      openApiSpec.paths[path] = {
        post: {
          tags: [serviceName],
          summary: `${operation} API`,
          description: `Auto-generated endpoint for ${operation}`,
          operationId: `${lowerOp}_${serviceName.replace(/\s+/g, "_")}`,
          parameters: [
            {
              name: "serviceId",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "Service identifier"
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: inferSchemaFromExample(requestExample),
                example: requestExample
              }
            }
          },
          responses: {
            200: {
              description: "Success",
              content: {
                "application/json": {
                  schema: inferSchemaFromExample(responseExample),
                  example: responseExample
                }
              }
            }
          }
        }
      };
    }
  
    console.log("✅ Generated OpenAPI:", openApiSpec);
    return openApiSpec;
  }
  