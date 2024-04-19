### Data Management Plan for E-commerce App - Storegrab
 
#### Data Entities:
 
### Collection: User

| Field                   | Type     | Description                                |
|-------------------------|----------|--------------------------------------------|
| userId                     | String   | Unique identifier for the user             |
| fname                   | String   | First name of the user                     |
| lname                   | String   | Last name of the user                      |
| hashedAndSaltedPassword| String   | Hashed and salted password for the user    |
| emailVerified           | Boolean  | Indicates whether the email is verified    |
| isVerified              | Boolean  | Indicates whether the user is vendor or not|
| address.country         | String   | Country of the user's address              |
| address.street1         | String   | Street address line 1                      |
| address.street2         | String   | Street address line 2 (optional)           |
| address.city            | String   | City of the user's address                 |
| address.state           | String   | State or province of the user's address    |
| address.zip             | String   | ZIP or postal code of the user's address   |
| vendors  | Array of String | number of vendors for the user as a vendor           |

### Collection: Inventory
 
| Field       | Type            | Description                               |
|-------------|-----------------|-------------------------------------------|
| skuId        | String          | Inventory unique Id                      |
| item        | String          | Name of the item                          |
| price       | Number          | Price of the item                         |
| qty         | Number          | Quantity of the item available            |
| size        | Object          | Dimensions of the item                    |
| size.h      | Number          | Height of the item                        |
| size.l      | Number          | Length of the item                        |
| size.w      | Number          | Width of the item                         |
| features    | String          | Features or description of the item       |
| categories  | Array of String | Categories the item belongs to            |
| image       | String          | Path to the image file representing the item |
 
### Collection: Vendors
 
| Key                  | Type            | Description                                    |
|----------------------|-----------------|------------------------------------------------|
| vendorId          | String          | Vendor ID                                      |
| vendor_name          | String          | Name of the vendor                             |
| vendor_description   | String          | Description of the vendor                      |
| vendor_location      | String          | Location of the vendor                         |
| vendor_contact_info  | String          | Contact information of the vendor              |
| website              | String          | Website URL of the vendor                      |
| rating               | Number          | Rating of the vendor                           |
| founded_year         | Number          | Year the vendor was founded                    |
| employees            | Number          | Number of employees working for the vendor    |
| products             | Array of String | Array of products offered by the vendor        |
 
### Collection: Orders
 
| Field            | Type           | Description                                     |
|------------------|----------------|-------------------------------------------------|
| orderId           | String         | Order unique Id                        |
| userId           | String         | Customer's email address                        |
| paymentId        | String         | Payment ID                                      |
| vendorId         | String         | Vendor ID                                       |
| paymentStatus    | String         | Payment status (e.g., "paid", "pending")        |
| status           | String         | Order status (e.g., "shippedAwaitingDelivery")  |
| currency         | String         | Currency code (e.g., "USD")                     |
| totalCost        | Number         | Total cost of the order                         |
| items            | Array of Objects | Array of items in the order                   |
| items.sku        | String         | SKU of the item                                 |
| items.quantity   | String         | Quantity of the item                            |
| items.price      | Number         | Price per unit of the item                      |
| items.discount   | Number         | Discount applied to the item                    |
| items.preTaxTotal| Number         | Total cost of the item before tax               |
| items.tax        | Number         | Tax amount applied to the item                  |
| items.total      | Number         | Total cost of the item including tax            |
| shipping         | Object         | Shipping details                                |
| shipping.address | Object         | Shipping address details                        |
| shipping.address.street1 | String   | Street address line 1                           |
| shipping.address.street2 | String   | Street address line 2                           |
| shipping.address.city    | String   | City                                            |
| shipping.address.state   | String   | State or province                               |
| shipping.address.country | String   | Country                                         |
| shipping.address.zip     | String   | ZIP or postal code                              |
| shipping.origin  | Object         | Origin address details                          |
| shipping.origin.street1  | String  | Street address line 1                           |
| shipping.origin.street2  | String  | Street address line 2                           |
| shipping.origin.city     | String  | City                                            |
| shipping.origin.state    | String  | State or province                               |
| shipping.origin.country  | String  | Country                                         |
| shipping.origin.zipCode  | String  | ZIP or postal code                              |
| shipping.carrier | String         | Shipping carrier (e.g., "USPS")                 |
| shipping.tracking| String         | Tracking number for the shipment                |

### Collection: Payment

| Field            | Type           | Description                                        |
|------------------|----------------|----------------------------------------------------|
| userId           | String         | Customer's email address                           |
| status           | String         | Payment status (e.g., "verified", "pending")       |
| gateway          | String         | Payment gateway used (e.g., "stripe", "paypal")    |
| type             | String         | Payment type (e.g., "credit", "debit")             |
| amount           | Number         | Amount of the payment                              |
| card             | Object         | Details of the payment card                        |
| card.brand       | String         | Brand of the payment card (e.g., "Visa", "Mastercard") |
| card.panLastFour | String         | Last four digits of the card's PAN (Primary Account Number) |
| card.expirationMonth | Number      | Expiration month of the card (1-12)                |
| card.expirationYear  | Number      | Expiration year of the card                        |
| card.cvvVerified | Boolean        | Indicates whether the CVV (Card Verification Value) was verified (true/false) |
 
### Collection: Ratings & Reviews
 
| Field    | Type      | Description                            |
|----------|-----------|----------------------------------------|
| reviewId | String    | Unique identifier for the review       |
| userId   | ObjectId  | Unique identifier for the user         |
| skuId    | ObjectId  | Unique identifier for the SKU/product  |
| rating   | Number    | Rating given in the review             |
| review   | String    | Text content of the review             |
 
### Access Control and Data Security:

1. **User Verification**: Utilize hashed passwords to safeguard user data. Implement secure password reset and retrieval mechanisms.

2. **Role-Based Access Control (RBAC)**: Assign distinct roles to users, vendors, and administrators to restrict access to specific features and information.

3. **Encryption**: Protect sensitive information such as passwords, credit card numbers, and usernames. Ensure secure data transmission using HTTPS.

4. **Database Security**: Implement access controls to limit direct database interaction. Regularly update and patch database software.

5. **Regular Data Backups**: Backup data regularly to prevent loss from accidents or security breaches.

### Data Storage Functional Requirements:

1. **User Administration**: Store user profiles containing payment information, shipping addresses, order histories, and personal data.

2. **Product Management**: Track product details including name, description, price, vendor information, category, stock levels, pictures, and ratings.

3. **Vendor Management**: Manage vendor details such as name, description, address, and contact information.

4. **Order Management**: Record user IDs, product IDs, quantities, dates, statuses, payment statuses, and shipping data for each order.

5. **Cart Management**: Maintain records of items in users' carts, along with their quantity, price, user ID, and product ID.

6. **Payment Management**: Store payment information such as amount, date, method, user ID, and order ID.

### Extra Features:

1. **Filter and Search**: Enable customers to search for vendors and items using various parameters like name, category, and price range.

2. **Recommendation System**: Implement a recommendation system to suggest products based on browsing history and user preferences.

3. **Reviews and Ratings**: Allow users to provide reviews and ratings for purchased items.

4. **Wishlist**: Enable users to add items to their wishlist for future purchase.

5. **Discounts and Promotions**: Offer discounts and promotions to encourage purchases.

By adhering to these security and functional standards, the e-commerce software can ensure data integrity, confidentiality, and availability while providing essential features for users, vendors, and administrators.


## Database Schema
### Order Schema
```
{
  "orderId": "String",
  "userId": "String",
  "paymentId": "String",
  "vendorId": "String",
  "paymentStatus": "String",
  "status": "String",
  "currency": "String",
  "totalCost": "Number",
  "items": [
    {
      "sku": "String",
      "quantity": "String",
      "price": "Number",
      "discount": "Number",
      "preTaxTotal": "Number",
      "tax": "Number",
      "total": "Number"
    },
    {
      "sku": "String",
      "quantity": "String",
      "price": "Number",
      "preTaxTotal": "Number",
      "tax": "Number",
      "total": "Number"
    }
  ],
  "shipping": {
    "address": {
      "street1": "String",
      "street2": "String",
      "city": "String",
      "state": "String",
      "country": "String",
      "zip": "String"
    },
    "origin": {
      "street1": "String",
      "street2": "String",
      "city": "String",
      "state": "String",
      "country": "String",
      "zipCode": "String"
    },
    "carrier": "String",
    "tracking": "String"
  }
}
```
### Payment Schema
```
{
  "userId": "String",
  "status": "String",
  "gateway": "String",
  "type": "String",
  "amount": "Number",
  "card": {
    "brand": "String",
    "panLastFour": "String",
    "expirationMonth": "Number",
    "expirationYear": "Number",
    "cvvVerified": "Boolean"
  }
}
```
### Vendor Schema
```
{
  "vendorId": "String",
  "vendor_name": "String",
  "vendor_description": "String",
  "vendor_location": "String",
  "vendor_contact_info": "String",
  "website": "String",
  "rating": "Number",
  "founded_year": "Number",
  "employees": "Number",
  "products": ["String"]
}
```
### Inventory Schema
```
{
  "skuId": "String",
  "item": "String",
  "price": "Number",
  "qty": "Number",
  "size": {
    "h": "Number",
    "l": "Number",
    "w": "Number"
  },
  "features": "String",
  "categories": ["String"],
  "image": "String"
}
```
### Review Schema
```
{
  "reviewId": "String",
  "userId": "ObjectId",
  "skuId": "ObjectId",
  "rating": "Number",
  "review": "String"
}
```
### User Schema
```
{
  "userId": "String",
  "fname": "String",
  "lname": "String",
  "hashedAndSaltedPassword": "String",
  "emailVerified": "Boolean",
  "address": {
    "country": "String",
    "street1": "String",
    "street2": "String",
    "city": "String",
    "state": "String",
    "zip": "String"
  }
  "vendors": ["String"]
}
```