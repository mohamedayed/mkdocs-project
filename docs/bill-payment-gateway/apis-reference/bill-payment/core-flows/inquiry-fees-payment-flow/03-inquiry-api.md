

## 1. 🔍 Inquiry API

Retrieves required billing or service details.

### ✅ Endpoint

```http
POST /v2/services/{serviceId}/inquiry
```

### 📥 Inquiry Request

=== "REST"
```json title="REST Request"
{
  "BillingAccount": "string",
  "localDate": "datetime",
  "version": "number",
  "serviceListVersion": "number",
  "Data": [
    {
      "Key": "string",
      "Value": "string",
      "Name": "string"
    }
  ]
}
```

=== "GraphQL"
```graphql title="GraphQL Equivalent"
query {
  serviceCatalog(version: 0) {
    id
    name
    services {
      serviceID
      serviceName
    }
  }
}
```

=== "gRPC"
```protobuf title="gRPC Request"
rpc GetServiceCatalog (ServiceCatalogRequest) returns (ServiceCatalogResponse);
```

### 📤 Inquiry Response

=== "REST"
```json title="REST Response"
{
  "Code": 200,
  "Message": "Success",
  "Brn": 123456,
  "Data": [...],
  "invoices": [...]
}
```
