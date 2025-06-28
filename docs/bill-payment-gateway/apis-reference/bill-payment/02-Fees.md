# 🔍 Overview

The **Fees API** is used after the Inquiry API to calculate applied service fees based on the provided service details before.

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

Following the Fees API, continue the service flow with:

- [Payment API](./03-Payment.md)

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
/services/{serviceId}/fees
{ 
  "amount": "decimal", 
  "version": "number",
  "serviceListVersion": "number",
  "brn":"number",
  "Data": [
    { 
      "Key": "string", 
      "Value": "string", 
      "Name": "string" 
    }
  ]
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
  "TotalAmount": "decimal",
  "Brn": "number",
  "Data": [
    {
      "Key": "string",
      "Value": "string",
      "Name": "string"
    }
  ],
  "amount": "decimal",
  "fees": "decimal",
  "taxes": "decimal",
  "discount": "decimal",
  "totalAmount": "decimal",
  "brn": "number"
}
```

---

## 🧪 Related Services

The following services use this API before payment:

- [Installments](../../../../01-Services/Installments)
- [Booking](../../../../01-Services/Installments)
- [Donation](../../../../01-Services/Installments)
- [Insurance](../../../../01-Services/Installments)



