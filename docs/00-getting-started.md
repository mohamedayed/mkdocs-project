### 🚀 Overview

This section outlines the developer's journey and how to make a successful API call as quickly and efficiently as possible.

---

### 🔄 Onboarding

To begin integrating with our APIs, follow this quick-start flow:

#### Flow Overview

#### 1. 📝 Register New Account

Developers must first register through the **Admin Portal** to obtain their API credentials.  
The required credentials include:

- **Username**
- **AccountID**
- **Password**

These are issued by the system administrator upon successful onboarding.

---

#### 2. 🔐 Authenticate to Obtain Access Token

Use the credentials to call the **Authentication API** and retrieve a valid **JWT access token**.  
This token will be used to authorize all subsequent API calls.

---

#### 3. 🧩 Service Onboarding Requirement

Before invoking the API flow, ensure that the target service is **predefined** or has been **onboarded** via the **Administration Tool**.

You can retrieve the configuration of a predefined service using one of the following methods:

Multiple services may utilize the same API interface but require distinct configurations. These configurations can be retrieved through:

- **[Service Catalog API](bill-payment-gateway/service-management/service-catalog.md)**  
  Intended for system-to-system integration, this API delivers machine-readable configuration data, including:
  - `serviceId`
  - Required parameters
  - Validation constraints (e.g., regular expressions)

- **[Product Catalog](bill-payment-gateway/service-management/product-catalog.md)**  
  Presents the same configuration details in a human-readable format, suitable for manual review and operational use.

> Both sources provide consistent core data. Select the appropriate option based on whether your integration is automated or user-facing.

⚠️ **Important:** Failure to complete this step will prevent successful execution of downstream APIs.

---

#### 4. 🔧 Execute the Service Flow

Once authenticated **and the service is onboarded**, developers can proceed to complete the full API flow. For example:

- **Inquiry API** – To retrieve service-specific data (e.g., bills, balances).
- **Fees API** – To calculate applicable transaction fees.
- **Payment API** – To complete and confirm the transaction.

Optional steps like **Retry** or **Check Status** may be invoked after the payment, if needed.

---

This complete flow ensures a **secure**, **streamlined**, and **developer-friendly** onboarding experience.


---

!!! note "🔁 Supported API Flows"
    To simplify your integration, we've streamlined all services into just **two core API flows**, making implementation **faster**, **more predictable**, and **easier to maintain**.

    Every service on our platform follows one of the following flows:

    - **Inquiry → Fees → Payment** – for standard services like bill payments, vouchers, and installments  
    - **Initiate → Confirm** – for wallet-based services such as Vodafone Cash, Orange Money, and similar

<div class="grid cards" markdown>

-   :material-format-list-checks:{ .lg .middle } **Inquiry → Fees → Payment**

    ---

    Used for the majority of services, including:

    - Bill payments  
    - Vouchers  
    - Top-ups  
    - Installments

    **Steps:**

    1. Inquiry using billing account  
    2. Fetch fees and validate  
    3. Proceed to payment

    [:octicons-arrow-right-24: Getting started](../bill-payment-gateway/bill-payment/core-flows/inquiry-fees-payment-flow/00-inquiry-fees-Payment)

-   :material-shield-key:{ .lg .middle } **Initiate → Confirm**

    ---

    Used for **cash-in / cash-out** wallet services, such as:

    - Vodafone Cash  
    - Orange Money  
    - Etisalat Cash  

    **Steps:**

    1. Initiate transaction  
    2. Confirm with OTP 

    [:octicons-arrow-right-24: Getting started](../bill-payment-gateway/bill-payment/core-flows/inquiry-fees-payment-flow/00-inquiry-fees-Payment)

</div>

---

These flows give you full control over UI rendering and request orchestration while ensuring security and scalability across all services.
