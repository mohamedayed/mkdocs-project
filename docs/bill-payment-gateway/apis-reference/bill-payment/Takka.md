## 📘 Overview

The **Takka Pay Installment API** enables merchants or third-party platforms to facilitate secure and real-time repayment of customer installment dues directly through **Takka Microfinance**.This API acts as a **payment gateway** for settling outstanding installment amounts using unique customer identifiers.

---

## 🏢 Business Name

**Takka**

---

## 🔁 Service Flow

Please refer to the **Service Flow** section detailed on the [Installments Overview](Overview.md#service-flow) page.

---

## ⚙️ Service Configuration

Used when listing or referencing service metadata such as service name, payment type, limits, and status in catalogs or during service discovery. It is used by developers or platform administrators to configure and register the service within the system, helping define how the service behaves and interacts with the platform.

| Field               | Value         | Description                                                                                          |
|--------------------|---------------|------------------------------------------------------------------------------------------------------|
| `serviceID`         | 362           | Unique identifier of the service                                                                     |
| `serviceName`       | أقساط         | Display name of the service (Arabic)                                                                 |
| `value`             | 0             | Default placeholder value                                                                            |
| `categoryTitle`     | *(empty)*     | Category of the service (optional)                                                                   |
| `paymentModeID`     | 1             | Payment mode used          |
| `status`            | 1             | Service status (1 = active, 0 = inactive)                                                            |
| `currency`          | مصري          | Currency used                                                                                        |
| `minValue`          | 1             | Minimum transaction amount                                                                           |
| `maxValue`          | 1000000000    | Maximum transaction amount                                                                           |
| `interval`          | 5             | Step increment for allowed transaction amounts                                                       |
| `inquirable`        | true          | Whether an inquiry is required before payment                                                        |
| `billPaymentModeID` | 1             | Bill payment method    |
| `serviceTypeID`     | 3             | Type of service        |
> ℹ️ **Notes**:
> - `paymentModeID`, `billPaymentModeID`, and `serviceTypeID` refer to standardized options documented in the [Common Parameters](../../03-Common%20Parameters.md) section.

---

## ⚙️ Service Parameter Configuration

The following parameters are used by **all APIs** when creating a request.  
Any **action-specific parameters** will be described in the documentation for each corresponding API.

Used by **consumers or clients** who will **consume the service as a product**.

These parameters represent the **input fields required at runtime** when using the service — for example:
- Customer number  
- Biiling Account 

They are essential for:
- UI input forms  
- Request validation  
- API payload construction

---

## 📚 API Reference

As per the referenced flow (link), you would need to call the following APIs:

- [Inquiry API](../../02-APIs%20Reference/Rest/v1/Bill%20Payment/01-Inquiry.md)
- [Fees API](../../02-APIs%20Reference/Rest/v1/Bill%20Payment/02-Fees.md)
- [Payment API](/../../02-APIs%20Reference/Rest/v1/Bill%20Payment/03-Payment.md)

Optional steps after executing the `Payment API` include:

- [Retry API](../../02-APIs%20Reference/Rest/v1/Bill%20Payment/03-Payment.md)
- [Check Status API](../../02-APIs%20Reference/Rest/v1/Bill%20Payment/06-Check Status.md)

---

## ❗ Errors

For information about errors common to all actions, see [Common Errors](../../04-Common%20Errors.md).

| Error Type              | Description                                                                                 | HTTP Status Code |
|-------------------------|---------------------------------------------------------------------------------------------|------------------|
| `BadRequestException`   | The submitted request is not valid (e.g., missing or incorrect input). See the error message for details. | `400`            |
| `ConflictException`     | The request configuration has conflicts. Refer to the error message for details.            | `409`            |
| `LimitExceededException`| The request exceeded the rate limit. Retry after the specified time.                        | `429`            |
| `TooManyRequestsException` | The request reached its throttling limit. Retry after the specified time.               | `429`            |
| `UnauthorizedException` | The request is denied due to insufficient permissions.                                      | `401`            |

---
