---
title: FORSA - Inquiry API
---

<div class="service-tab-controls">
  <button class="tab-button is-active" data-tab="rest" onclick="showTab('rest')">REST</button>
  <button class="tab-button" data-tab="graphql" onclick="showTab('graphql')">GraphQL</button>
  <button class="tab-button" data-tab="grpc" onclick="showTab('grpc')">gRPC</button>
</div>

### 📝 Description
خدمة **فرصة - تقسيط بدون فوائد** توفر لك إمكانية معرفة بيانات الفاتورة الخاصة بك قبل السداد.

## ✅ Endpoint

```http
POST /v2/services/{serviceId}/inquiry
```

## 📥 Request

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

## 📤 Response

```json
{
  "Code": 200,
  "Message": "Success",
  "Brn": 123456,
  "Data": [],
  "invoices": []
}
```
