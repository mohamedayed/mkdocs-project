<div class="api-header">
  <button class="back-button" onclick="history.back()" title="Go back">←</button>
  <div class="service-title-wrapper">
    <h1 id="service-title">watanya company for roads API</h1>
  </div>
</div>

<!-- 
<div class="service-title-wrapper">
  <h1 id="service-title">API Documentation</h1>
  <p class="service-subtitle">Unified documentation for service requests and responses</p>
</div> -->


<script>
  document.addEventListener("DOMContentLoaded", function () {
    const name = sessionStorage.getItem("serviceName") || "Unknown Service";
    const h1 = document.getElementById("service-title");
    if (h1) h1.textContent = `${name}  API`;
  });
</script>

<!-- ### 📝 Description
خدمة **فرصة - تقسيط بدون فوائد** توفر لك إمكانية معرفة بيانات الفاتورة الخاصة بك قبل السداد. -->




<!-- DRAWER HTML -->
<div id="swagger-drawer" class="swagger-drawer">
  <div class="swagger-drawer-header">
    <button id="close-swagger-drawer" class="close-drawer">&times;</button>
  </div>
  <div id="swagger-ui" class="swagger-ui-panel"></div>
</div>
<div id="swagger-markdown-output"></div>

<!-- TOGGLE SCRIPT + SWAGGER -->
<script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const drawer = document.getElementById("swagger-drawer");
    const closeBtn = document.getElementById("close-swagger-drawer");

    // Trigger drawer open
   // drawer.classList.add("open");

    // Close drawer
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        drawer.classList.remove("open");
      });
    }

    const docs = JSON.parse(sessionStorage.getItem("serviceDocs") || "{}");
    const name = sessionStorage.getItem("serviceName") || "Unknown Service";

    if (!docs || Object.keys(docs).length === 0) {
      document.getElementById("swagger-ui").innerHTML =
        "<p style='color:red;'>❌ No Swagger data found. Please go back and select a service again.</p>";
      return;
    }

    const spec = convertDocsToOpenApi(docs, name);
    SwaggerUIBundle({
      spec,
      dom_id: "#swagger-ui",
      layout: "BaseLayout",
      presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
    });
  });
</script>

<!-- prettier-ignore-end -->


## Inquiry API



## Request

=== "REST"

    ```json
    {
      "BillingAccount": "string",
      "localDate": "datetime",
      "version": 1,
      "serviceListVersion": 2,
      "Data": [
        {
          "Key": "nationalId",
          "Value": "28405091523151",
          "Name": "الرقم القومي"
        }
      ]
    }
    ```

=== "GraphQL"

    ```graphql
    query {
      getInquiry(
        input: {
          BillingAccount: "string",
          localDate: "datetime",
          version: 1,
          serviceListVersion: 2,
          Data: [{ key: "nationalId", value: "28405091523151", name: "الرقم القومي" }]
        }
      ) {
        code
        message
        brn
      }
    }
    ```

=== "gRPC"

    ```protobuf
      message InquiryRequest {
        string BillingAccount = 1;
        string localDate = 2;
        int32 version = 3;
        int32 serviceListVersion = 4;
        repeated KeyValue Data = 5;
      }
    ```



## Response

=== "REST"

    ```json title="REST Request"
      {
      "Code": 200,
      "Message": "Success",
      "Brn": 123456,
      "Data": [],
      "invoices": []
    }

    ```

=== "GraphQL"

    ```graphql title="GraphQL Equivalent"
    
        {
      "data": {
        "getInquiry": {
          "code": 200,
          "message": "Success",
          "brn": 123456,
          "data": [],
          "invoices": []
        }
      }
    }

    ```

=== "gRPC"

    ```protobuf title="gRPC Request"
        message InquiryResponse {
        int32 code = 1;
        string message = 2;
        int64 brn = 3;
        repeated KeyValue data = 4;
        repeated Invoice invoices = 5;

        message KeyValue {
          string key = 1;
          string value = 2;
          string name = 3;
        }

        message Invoice {
          // define fields if known
        }
        }


    ```
---

