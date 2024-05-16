const Order = require('../models/Order');

module.exports = {
  addOrder: async (orderData) => {
    try {
      return await Order.insertMany(orderData);
    } catch (error) {
      console.error("Error adding orders:", error);
      throw new Error('Failed to add orders to the database');
    }
  },
  // Other order-related controller functions...
};