const Product = require('../models/product');

module.exports = {
  addInventory: async (inventoryData) => {
    try {
      return await Product.insertMany(inventoryData);
    } catch (error) {
      console.error("Error adding inventory:", error);
      throw new Error('Failed to add inventory to the database');
    }
  },
  // Other inventory-related controller functions...
};