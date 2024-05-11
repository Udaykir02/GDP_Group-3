const Inventory = require('../models/inventory')

// module.exports = {
//   addInventory: async (inventoryData) => {
//     try {
//       return await Product.insertMany(inventoryData);
//     } catch (error) {
//       console.error("Error adding inventory:", error);
//       throw new Error('Failed to add inventory to the database');
//     }
//   },
//   // Other inventory-related controller functions...
// };

// Controller method to insert vendors' data with geopoints
const insertInventory = async (req, res) => {
  try {

    // // Extract vendor data including geopoint from request body
    // const { vendorData } = req.body;
    // console.log(JSON.stringify(req.body))
    // // Create a new vendor instance
    const newProduct = new Inventory(req.body);

    // Save the vendor to the database
    await newProduct.save();

    res.status(201).json({ message: 'Inventory data inserted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { insertInventory }