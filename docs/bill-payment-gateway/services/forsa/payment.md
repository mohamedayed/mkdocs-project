---
title: FORSA - Payment API
---

<div class="service-tab-controls">
  <button class="tab-button is-active" data-tab="rest" onclick="showTab('rest')">REST</button>
  <button class="tab-button" data-tab="graphql" onclick="showTab('graphql')">GraphQL</button>
  <button class="tab-button" data-tab="grpc" onclick="showTab('grpc')">gRPC</button>
</div>

### 📝 Description
بعد تنفيذ الاستعلام وحساب الرسوم، يتم تنفيذ عملية الدفع النهائية لخدمة **فرصة**.

## ✅ Endpoint

```http
POST /v2/services/{serviceId}/payment
```

## 📥 Request

=== "REST"
```json
{
  "billingAccount": "28405091523151",
  "version": 1,
  "serviceListVersion": 2,
  "brn": 123456,
  "Data": [
    {
      "Key": "amount",
      "Value": "5000",
      "Name": "قيمة الدفع"
    }
  ],
  "hostTransactionID": "TXN-0001",
  "isRetry": false,
  "pmtMethod": "Cash",
  "compositeTransactionId": "CMP-0001"
}
```

=== "GraphQL"
```graphql
mutation {
  processPayment(input: {
    billingAccount: "28405091523151",
    version: 1,
    serviceListVersion: 2,
    brn: 123456,
    hostTransactionID: "TXN-0001",
    isRetry: false,
    pmtMethod: "Cash",
    compositeTransactionId: "CMP-0001",
    data: [{ key: "amount", value: "5000", name: "قيمة الدفع" }]
  }) {
    code
    message
    totalAvailableBalance
  }
}
```

=== "gRPC"
```protobuf
message PaymentRequest {
  string billingAccount = 1;
  int32 version = 2;
  int32 serviceListVersion = 3;
  int64 brn = 4;
  repeated KeyValue data = 5;
  string hostTransactionID = 6;
  bool isRetry = 7;
  string pmtMethod = 8;
  string compositeTransactionId = 9;
}
```

## 📤 Response

```json
{
  "Code": 200,
  "Message": "Payment Successful",
  "totalAvailableBalance": 945.5,
  "receipt": [
    {
      "footer": "Thank you for using FORSA Installment"
    }
  ]
}
```
