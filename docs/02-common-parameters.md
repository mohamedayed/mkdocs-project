The following list includes the parameters used by all products for configuration. Product-specific parameters are detailed in the respective service page.

## 📘 BillPaymentModes

This table defines different payment behaviors allowed for bill payment services.

| ID | Name       | ArName  |
|----|------------|---------|
| 1  | Only one   | واحد    |
| 2  | Must all   | جميع    |
| 3  | Multiple   | متعدد   |

---

## 📘 ServiceTypes

This table categorizes the types of services available in the system.

| ID | Name             | ArName         | IndexLevel | IsReprintGroup |
|----|------------------|----------------|------------|----------------|
| 1  | Topup            | شحن            | 3          | 1              |
| 2  | Vouchers         | كروت           | 2          | 1              |
| 3  | Bills            | فواتير         | 1          | 1              |
| 4  | PrePayed         | مسبق الدفع      | 0          | 0              |
| 5  | Momkn Services   | خدمات ممكن      | 0          | 0              |
| 6  | Wallet           | محفظة          | 5          | 1              |
| 7  | Wallet CashOut   | محفظة سحب       | 6          | 0              |
