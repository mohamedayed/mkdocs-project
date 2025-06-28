---
title: FORSA - Inquiry API
---


### 📝 Description
خدمة **فرصة - تقسيط بدون فوائد** توفر لك إمكانية معرفة بيانات الفاتورة الخاصة بك قبل السداد.

<div markdown=1 class="sidebar">
# Toc Sidebar

It's filled with information specific to this page.

It's locked to the screen just like the ToC!
</div>

<div id="swagger-drawer" class="swagger-drawer">
  <div class="swagger-drawer-header">
    <button id="close-swagger-drawer" class="close-drawer">&times;</button>
  </div>
  <div id="swagger-ui" class="swagger-ui-panel"></div>
</div>

<div id="swagger-markdown-output"></div>
<script src="/js/convert-swagger-to-html.js"></script>
<!-- 
<div class="service-tab-controls">
  <button class="tab-button is-active" data-tab="popular" onclick="showTab('popular')"> Popular</button>
  <button class="tab-button" data-tab="all" onclick="showTab('all')">All Services</button>
</div> -->


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
