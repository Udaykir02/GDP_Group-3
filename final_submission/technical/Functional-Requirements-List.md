# Functional Requirements for Storegrab

## General Requirements:

1. The system **SHALL** authenticate user credentials.
2. The system **SHALL** encrypt and securely store user passwords.
3. The system **SHALL** provide a user interface for account creation.
4. The system **SHALL** facilitate users in resetting their passwords through a secure and robust procedure.
5. The system **SHALL** log user access and authentication attempts for security auditing.
6. The system **SHALL** provide a list of local shop vendors.
7. The system **SHALL** provide a user interface for specific and user-selected vendor products and their services.
8. The system **SHALL** provide a user interface for admin functionality.
9. The system **SHALL** provide butter smooth navigation flow.
10. The system **SHALL** provide a filter feature on the list of vendors.
11. the system **SHALL** work on subscription-based pricing for the vendors.
12. The system **SHALL** include Map Routing Mechanism
13. The system **SHALL** have delivery Management System.
14. The system **SHALL** include an Inventory Management System for the vendors.
15. The system **SHALL** include order fulfilment process.
16. The system **SHALL** provide a payment gateway for order placement and billing.
17. The system **SHALL** provide a user interface for product description which is both minimalistic and descriptive.
18. The system **SHALL** allow users to add required products to the cart.
19. The system **SHALL** allow users to purchase products.
20. The system **SHALL** provide a search engine for the products which is robust and efficient.
21. The system **SHALL** provide wide varieties of products.
22. The system **SHALL** allow filtering of products based on the product categories, price, brand, etc.
23. The system branding **SHOULD** be less compared to vendor branding.
24. The system **SHOULD** provide a specific vendor branding.
25. The system **SHOULD** implement multi-factor authentication for enhanced security.
26. The system **SHOULD** provide real-time feedback on the strength of user-created passwords.
27. User account options, including notification choices, **SHOULD** be customizable via the system.
28. The system **SHOULD** enable users to link their accounts with external authentication providers (e.g., Google, Facebook).
29. The system **SHOULD** send email notifications for critical account activities (e.g., password changes, account deactivation).

## Additional Features:

30. The system **MAY** implement a biometric authentication feature for supported devices.
31. The system **MAY** provide users with the option to choose between light and dark themes in the user interface.
32. The system **MAY** offer a "Remember Me" functionality for convenient user login on trusted devices.
33. The system **MAY** allow users to export their account data in a downloadable format.
34. The system **MAY** integrate with third-party identity verification services for enhanced user verification.
35. The system **MAY** include saved vendor preferences.
36. The system **MAY** take the user's address and contact number for order fulfillment.

## Negative Requirements:

37. The system **SHALL NOT** include any ads.
38. Sensitive data, including credit card numbers, **SHALL NOT** be stored by the system in plain text.
39. Without express user authorization, the system **SHALL NOT** share user data with third parties.
40. The system **SHALL NOT** allow more than three consecutive failed login attempts within a five-minute window.
