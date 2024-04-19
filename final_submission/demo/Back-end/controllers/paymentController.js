const Payment = require('../models/Payment');

module.exports = {
  addPayment: async (paymentData) => {
    try {
      return await Payment.insertMany(paymentData);
    } catch (error) {
      console.error("Error adding payments:", error);
      throw new Error('Failed to add payments to the database');
    }
  },
  // Other payment-related controller functions...
};