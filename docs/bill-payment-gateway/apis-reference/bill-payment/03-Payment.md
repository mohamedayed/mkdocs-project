# 🔍 Overview

The **Paymnet API** is used to execute the transaction after calculating the necessary fees. It processes the actual payment based on the service details retrieved earlier.

---

## 🔄 Service Flow

![Service Flow](../../../../../../../assets/ServiceFlow.jpg)

---

## ✅ Pre-requisites

### 🔐 [Authentication](../Account%20Management/Authentication.md)

### ⚙️ Service Configuration

Several services use the same API but with different configurations. You can obtain the configuration using one of the following:

- **[Service Catalog API](../Service%20Management/Service%20Catalog.md)** – retrieves necessary data such as `serviceId`, parameters, regular expressions.

---

## ✅ Post-requisites

Optional steps include:

- [Confirmation API](./04-Confirm.md)
- [Cancel API](./05-Cancel.md)
- [Retry API](./03-Payment.md)
- [Check Status API](./06-Check Status.md)

---

## 📄 API Specifications

### 🔐 Security

- **Authentication**: See the [Headers](#-headers) section for more details.
- **Encryption**: N/A

### 🧾 Headers

Any request to this API requires the Authorization header which will have the token generated


### 📥 Request

See [Request Syntax](#-request-syntax) below for full details.


### 📤 Response

See [Response Syntax](#-response-syntax) below for full details.


### 📦 Pagination

- N/A

### 🔍 Searching/Querying

- N/A

### 🚦 Request Limiting

- N/A

---

## 🔧 Request Syntax

**Endpoint:**

```
HTTPS: POST
--header 'Authorization: ••••••' 
/services/{serviceId}/payment
{ 
  "ambillingAccount": "string", 
  "version": "number",
  "serviceListVersion": "number",
  "brn":"number",
  "Data": [
    { 
      "Key": "string", 
      "Value": "string", 
      "Name": "string" 
    }
  ],
  "hostTransactionID": "string",
  "isRetry": true,
  "pmtMethod": "Cash",
  "compositeTransactionId": "string"
}
```
### 🔗 URI Request Parameters

| Parameter   | Description                                                                 | Required |
|-------------|-----------------------------------------------------------------------------|----------|
| `serviceId` | The `serviceId` resource representing the service the client inquires about. | ✅ Yes    |

---

## 📤 Response Syntax

```json
{
  "Code": "number",
  "Message": "string",
  "totalAvailableBalance": "deciaml",
  "totalBalance": "decimal",
  "Brn": "number",
  "Data": [
    {
      "Key": "string",
      "Value": "string",
      "Name": "string"
    }
  ],
"receipt": [
    {
      "title": {
        "serviceName": "string"
      },
      "header": {
        "data": [
          {
            "key": "string",
            "value": "string",
            "name": "string",
            "bold": true,
            "alignment": 0,
            "parameterType": 0,
            "fontSize": 0
          }
        ]
      },
      "body": {
        "data": [
          {
            "key": "string",
            "value": "string",
            "name": "string",
            "bold": true,
            "alignment": 0,
            "parameterType": 0,
            "fontSize": 0
          }
        ]
      },
      "disclaimer": "string",
      "footer": "string"
    }
  ]
}
```

---

## 🧪 Related Services

The following services use this API to process the actual payment:

- [Installments](../../../../01-Services/Installments)
- [Booking](../../../../01-Services/Installments)
- [Donation](../../../../01-Services/Installments)
- [Insurance](../../../../01-Services/Installments)




