## Instructions for Adding Data to MongoDB with Given Schema

1. **Connect to MongoDB**: Ensure MongoDB is installed and running. Connect using a MongoDB client or shell.


2. **Create Collections**: Create collections for each schema:
   - User Collection:
     ```bash
     db.createCollection("users")
     ```
   - Inventory Collection:
     ```bash
     db.createCollection("inventory")
     ```
   - Vendors Collection:
     ```bash
     db.createCollection("vendors")
     ```
   - Orders Collection:
     ```bash
     db.createCollection("orders")
     ```
   - Payments Collection:
     ```bash
     db.createCollection("payments")
     ```
   - Ratings & Reviews Collection:
     ```bash
     db.createCollection("ratings_reviews")
     ```
   - Customer Support Collection:
     ```bash
     db.createCollection("customer_support")
     ```

3. **Insert Data**: Insert provided data into collections using `insertMany()` method:
   - User Collection:
     ```
      const axios = require('axios');
      
      // Function to add mock user data
      const addUser = async (userData) => {
        try {
          const response = await axios.post('http://localhost:3000/api/users', userData);
          console.log(response.data);
        } catch (error) {
          console.error('Error adding user:', error.response.data.error);
        }
      };
      
      // Example mock user data
      const userData = {
        userId: "1",
        fname: "John",
        lname: "Doe",
        hashedAndSaltedPassword: "hashedPassword123",
        emailVerified: true,
        address: {
          country: "US",
          street1: "123 Main St",
          city: "New York",
          state: "NY",
          zip: "10001"
        }
      };
      
      // Add mock user data
      addUser(userData);
     ```
   - Inventory Collection:
     ```
      // Function to add mock inventory data
      const addInventory = async (inventoryData) => {
        try {
          const response = await axios.post('http://localhost:3000/api/inventory', inventoryData);
          console.log(response.data);
        } catch (error) {
          console.error('Error adding inventory:', error.response.data.error);
        }
      };
      
      // Example mock inventory data
      const inventoryData = {
        skuId: "1001",
        item: "Smartphone",
        price: 599.99,
        qty: 100,
        size: {
          h: 6,
          l: 3,
          w: 0.5
        },
        features: "5G, OLED Display, Dual Camera",
        categories: ["Electronics", "Mobile Phones"],
        image: "/images/smartphone.jpg"
      };
      
      // Add mock inventory data
      addInventory(inventoryData);
     ```
   - Vendors Collection:
     ```
      // Function to add mock vendor data
      const addVendor = async (vendorData) => {
        try {
          const response = await axios.post('http://localhost:3000/api/vendors', vendorData);
          console.log(response.data);
        } catch (error) {
          console.error('Error adding vendor:', error.response.data.error);
        }
      };
      
      // Example mock vendor data
      const vendorData = {
        vendorId: "V1001",
        vendor_name: "Electronics Emporium",
        vendor_description: "Your one-stop shop for all electronics needs.",
        vendor_location: "123 Tech St, Silicon Valley, CA",
        vendor_contact_info: "contact@electronics-emporium.com",
        website: "https://www.electronics-emporium.com",
        rating: 4.5,
        founded_year: 2005,
        employees: 50,
        products: ["Smartphones", "Laptops", "Tablets"]
      };
      
      // Add mock vendor data
      addVendor(vendorData);
     ```

4. **Verify Data**: Query collections using `find()` method to verify insertion.

You have successfully added the provided data into MongoDB with the given schema. Use these collections for further development and testing in your application.
