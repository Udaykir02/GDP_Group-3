const express = require('express');
const router = express.Router();
const customerSupportController = require('../controllers/customerSupportController');

// Route for adding customer support data
router.post('/customer-support', async (req, res) => {
  try {
    const newCustomerSupport = await customerSupportController.addCustomerSupport(req.body);
    res.status(201).json(newCustomerSupport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define other routes for customer support as needed

module.exports = router;
