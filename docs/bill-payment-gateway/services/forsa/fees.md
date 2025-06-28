---
title: FORSA - Fees API
---

<div class="service-tab-controls">
  <button class="tab-button is-active" data-tab="rest" onclick="showTab('rest')">REST</button>
  <button class="tab-button" data-tab="graphql" onclick="showTab('graphql')">GraphQL</button>
  <button class="tab-button" data-tab="grpc" onclick="showTab('grpc')">gRPC</button>
</div>

### 📝 Description
احسب قيمة الفاتورة النهائية من خلال خدمة **حساب الرسوم** بناءً على بيانات الاستعلام السابقة.

## ✅ Endpoint

```http
POST /v2/services/{serviceId}/fees
```

## 📥 Request

=== "REST"
```json
{
  "amount": 5000,
  "version": 1,
  "serviceListVersion": 2,
  "brn": 123456,
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
mutation {
  calculateFees(input: {
    amount: 5000,
    version: 1,
    serviceListVersion: 2,
    brn: 123456,
    data: [{ key: "nationalId", value: "28405091523151", name: "الرقم القومي" }]
  }) {
    code
    message
    totalAmount
  }
}
```

=== "gRPC"
```protobuf
message FeesRequest {
  int32 serviceId = 1;
  double amount = 2;
  int64 brn = 3;
  int32 version = 4;
  int32 serviceListVersion = 5;
  repeated KeyValue data = 6;
}
```

## 📤 Response

```json
{
  "Code": 200,
  "Message": "Fees calculated",
  "totalAmount": 5050,
  "brn": 123456,
  "fees": 50,
  "taxes": 0,
  "discount": 0,
  "amount": 5000,
  "Data": []
}
```
