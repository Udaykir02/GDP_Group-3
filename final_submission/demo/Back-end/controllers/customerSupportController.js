const CustomerSupport = require('../models/CustomerSupport');

module.exports = {
  addCustomerSupport: async (customerSupportData) => {
    try {
      return await CustomerSupport.insertMany(customerSupportData);
    } catch (error) {
      console.error("Error adding customer support data:", error);
      throw new Error('Failed to add customer support data to the database');
    }
  },
  // Other customer support-related controller functions...
};