# 💰 Inquiry → Fees → Payment Flow

This flow is used for most transactional services in our ecosystem. It enables clients to:

- Retrieve billing data
- Calculate exact fees
- Execute and finalize the payment

---

## 🔁 Flow Diagram
```mermaid
graph LR
    A[Inquiry] --> B[Fees]
    B --> C[Payment]
    C --> D{Optional Steps}
    D --> E[Retry]
    D --> F[Confirm]
    D --> G[Cancel]
    D --> H[Check Status]
```