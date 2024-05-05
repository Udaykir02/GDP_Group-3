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

exports.getLocalVendors = async (filters) => {
  try {
      // Apply filters if provided, otherwise fetch all local vendors
      let query = {};
      if (filters.type) {
          query.type = filters.type;
      }
      if (filters.city) {
          query.city = filters.city;
      }
      return await Vendor.find(query);
  } catch (error) {
      throw new Error('Failed to retrieve vendors.');
  }
};