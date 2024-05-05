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

// Route for retrieving order status
router.get('/orders/:orderId/status', async (req, res) => {
  try {
      // Retrieve order status based on order ID
      const order = await Order.findById(req.params.orderId);
      if (!order) {
          return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json({ status: order.status });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
// Define other routes for orders as needed

module.exports = router;
