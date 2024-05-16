const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrder, updateOrder, deleteOrder} = require('../controllers/orderController');

// Route for adding orders
router.post('/create', createOrder);
router.post('/orders', getAllOrders);
router.post('/get', getOrder);
router.post('/update', updateOrder);
router.post('/delete', deleteOrder);
// Define other routes for orders as needed

module.exports = router;
