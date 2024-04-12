const User = require('../models/User');

module.exports = {
  addUser: async (userData) => {
    try {
      return await User.insertMany(userData);
    } catch (error) {
      console.error("Error adding users:", error);
      throw new Error('Failed to add users to the database');
    }
  },
  // Other user-related controller functions...
};