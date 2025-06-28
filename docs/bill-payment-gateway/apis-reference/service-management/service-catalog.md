# 🛠️ Service Catalog API (Dynamic Service Builder)

The **Service Catalog API** acts as the foundation for dynamically building and rendering services in your app.  
It eliminates the need to hardcode each service manually by providing all necessary configurations from the backend.

> Think of it as a **UI-driven service builder** — your app only needs to read the config and render the inputs dynamically.

---

## 🧭 Sections Overview

* [🎯 What Is the Service Catalog](#-what-is-the-service-catalog)  
* [🔐 Endpoint & Authentication](#-endpoint--authentication)  
* [🔁 Integration Flow (Diagram)](#-integration-flow-diagram)  
* [📦 Sample Response](#-sample-response)  
* [📘 Parameter Definitions](#-parameter-definitions)  
* [🔄 Bill Payment Mode Matrix](#-bill-payment-mode-matrix)  
* [💡 Integration Tips](#-integration-tips)  
* [❌ Error Example](#-error-example)  
* [🧠 Summary](#-summary)  

---

## 🎯 What Is the Service Catalog

The Service Catalog is a structured configuration of:

* Available **service categories** and subcategories  
* All **API-ready services**  
* Their **dynamic input fields**  
* Validation rules  
* UI hints like **displayed vs hidden fields**

You can use this catalog to:

* 🏗️ Render service input screens  
* 🔁 Know which APIs to call (inquiry, fees, payment)  
* 📤 Generate payloads based on dynamic parameters  

<!-- ---

## 🔐 Endpoint & Authentication

# Basics

## 1. Part1
!!! Tips
    this is a tip


!!! Note 
    This is a Note


!!! Warning
    Removing an actively used toolchain will render the virtualenvs that refer to use broken.


## 2. Part2
This is part2 -->

## 📘 Service Catalog API

The **Service Catalog API** returns all the services granted to you.  
This is the entry point for dynamically generating UI components based on backend configurations.

---

### 🛠️ First-Time Use

!!! tip "How to Use"
    When calling the API for the first time, make sure to pass the following header:

    ```http title="Required Header (First-Time Only)"
    ServiceListVersion: 0
    ```

    This ensures you receive the full list of available services dynamically from the backend.

---

=== "REST"
    ```bash
    GET https://test.momkn.org/gateway/api/v2/categories/0
    Authorization: Bearer {token}
    UserName: yourUsername
    ChannelIdentifier: yourChannel
    ServiceListVersion: 0
    ```

=== "GraphQL"
    ```graphql
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
```protobuf
rpc GetServiceCatalog (ServiceCatalogRequest) returns (ServiceCatalogResponse);
```
  





### 🌐 Sample API

!!! note "Sample API Endpoint"
    ```http title="GET Service Catalog"
    GET https://test.momkn.org/gateway/api/v2/categories/0
    ```




```json title="sample-response.json"
{
  "code": 200,
  "message": "عملية ناجحة",
  "serviceListVersion": "82",
  "serviceList": {
    "id": 1,
    "name": "خدمات ممكن",
    "parentID": 0,
    "lastNode": false,
    "index": 0,
    "level": 0,
    "serviceSubCategoryLabel": "",
    "services": [],
    "serviceCategory": [
      {
        "id": 195,
        "name": "مواصلات",
        "parentID": 1,
        "lastNode": false,
        "index": 195,
        "level": 2,
        "serviceSubCategoryLabel": "الشركه",
        "services": [],
        "serviceCategory": [
          {
            "id": 196,
            "name": "جوباص",
            "parentID": 195,
            "lastNode": true,
            "index": 196,
            "level": 3,
            "serviceSubCategoryLabel": "",
            "services": [
              {
                "serviceID": 646,
                "serviceName": "باص جو",
                "value": 0.00,
                "categoryTitle": "",
                "paymentModeID": 1,
                "status": 1,
                "currency": "مصري",
                "minValue": 1.00,
                "maxValue": 1000000.00,
                "interval": 5,
                "inquirable": true,
                "billPaymentModeID": 1,
                "serviceTypeID": 3,
                "serviceParameter": [
                  {
                    "label": "رقم الحجز الالكترونى",
                    "title": "برجاء ادخال رقم الحجز الالكترونى",
                    "valueModeID": "2",
                    "valueTypeID": "1",
                    "optional": false,
                    "sequence": "1",
                    "key": "billingAccount",
                    "valueList": {
                      "values": []
                    },
                    "value": "0",
                    "validationExpression": "^[0-9]{1,30}$",
                    "validationMessage": "الرقم غير صحيح",
                    "methodIds": "1",
                    "displayed": true
                  }
                ]
              }
            ],
            "serviceCategory": []
          }
        ]
      }
    ]
  }
}
```
```json title="error-response.json"
{
  "code": -16,
  "message": "لا توجد بيانات"
}
```



### 📘 Parameter Definitions

| Field              | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `serviceID`        | Unique ID used in all API calls                                              |
| `inquirable`       | Whether the service requires an inquiry step                                |
| `paymentModeID`    | Payment method:<br>`1 = Fixed`, `2 = Partial`, `3 = In Advance`              |
| `billPaymentModeID`| Bill mode:<br>`1 = One`, `2 = All`, `3 = Multiple invoices`                  |
| `optional`         | `false` = mandatory field<br>`true` = optional                               |
| `displayed`        | `true` = shown to user<br>`false` = sent silently in background              |
| `valueTypeID`      | Input type:<br>`1 = Numeric`, `2 = String`, `3 = Dropdown`, `4 = Date`, `6 = Decimal` |
