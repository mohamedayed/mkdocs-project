# 🔍 Overview

The **Inquiry API** allows you to get the necessary information (such as due bills) about _inquirable_ services in order to proceed with payment.

---

## 🔄 Service Flow

![Service Flow](../../../../../../../assets/ServiceFlow.jpg)

---

## ✅ Pre-requisites

### 🔐 [Authentication](../Account%20Management/Authentication.md)

### ⚙️ Service Parameter Configuration

Refer to the [Getting Started Guide](../../../../00-Geting%20Start.md#3--service-onboarding-requirement) for detailed instructions on how to retrieve and configure service parameters.

---

## ✅ Post-requisites

Following the Inquiry API, continue the service flow with:

- [Fees API](./02-Fees.md)
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

### 📦 Pagination

- N/A

### 🔍 Searching/Querying

- N/A

### 🚦 Request Limiting

- N/A

---

### 🔧 Request Syntax

**Endpoint:**

```
HTTPS: POST
--header 'Authorization: ••••••' 
/services/{serviceId}/inquiry
```
```json
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
### 🔗 URI Request Parameters

| Parameter   | Description                                                                 | Required | How to Get                                                                                                                        |
|-------------|-----------------------------------------------------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------|
| `serviceId` | The `serviceId` resource representing the service the client inquires about. | ✅ Yes   | Retrieve it from the [Service Catalog API](../Service%20Management/Service%20Catalog.md) and search the response by business name mentioned in the service section. |

---

### 📤 Response Syntax

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
  "invoices": [
    {
      "Sequence": "number",
      "alias": "string",
      "amount": "decimal",
      "minAmount": "decimal",
      "maxAmount": "decimal",
      "Data": [
        {
          "Key": "string",
          "Value": "string",
          "Name": "string"
        }
      ]
    }
  ]
}
```

---

## 🔗 Try This API

You can try out this API on one of our available environments.
> 💡 **Hint:** Before testing, ensure you've completed the onboarding and access steps outlined in the [Getting Started](../path/to/getting-started.md) section.

### 🔍 Environments Available for Partners and 3rd Parties:

| Environment | Test Data |
|-------------|-----------|
| [🔍 Open Sandbox UI](http://10.90.7.61:31033/swagger/index.html?urls.primaryName=V2) | [Go To](../path/to/test-data-file.md) |
| [🔍 Open Production UI](http://10.90.7.61:31033/swagger/index.html?urls.primaryName=V2) | [Go To](../path/to/test-data-file.md) |

> 🛠️ This link opens the documentation for version 2 of the API.

---

## 🧪 Related Services

The following services are configured as **inquirable** and use this API to retrieve billing information before payment:

- [Installments](../../../../01-Services/Installments)
  - [Takka](../../../../01-Services/Installments/Takka.md)
- [AirTime](../../../../01-Services/Teleco/AirTime)
  - [Top-up](../../../../01-Services/Teleco/AirTime/Top-up)
    - [Etisalat](../../../../01-Services/Teleco/AirTime/Top-up/Etisalat.md)
    - [Orange](../../../../01-Services/Teleco/AirTime/Top-up/Orange.md)
- [Booking](../../../../01-Services/Booking)
- [Donation](../../../../01-Services/Donation)
- [Insurance](../../../../01-Services/Insurance)
