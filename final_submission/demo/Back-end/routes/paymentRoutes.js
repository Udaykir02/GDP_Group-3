const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route for adding payments
router.post('/payments', async (req, res) => {
  try {
    const newPayment = await paymentController.addPayment(req.body);
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define other routes for payments as needed

module.exports = router;
