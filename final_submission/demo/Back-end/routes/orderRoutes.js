const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route for adding orders
router.post('/orders', async (req, res) => {
  try {
    const newOrder = await orderController.addOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define other routes for orders as needed

module.exports = router;
