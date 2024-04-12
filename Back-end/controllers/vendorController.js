const Vendor = require('../models/Vendor');

module.exports = {
  addVendor: async (vendorData) => {
    try {
      return await Vendor.insertMany(vendorData);
    } catch (error) {
      console.error("Error adding vendors:", error);
      throw new Error('Failed to add vendors to the database');
    }
  },
  // Other vendor-related controller functions...
};