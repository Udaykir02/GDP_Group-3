const express = require('express');
const router = express.Router();
const { paymentSheetController, placeOrder } = require('../controllers/stripeController');
const { verifyTokenAndUser } = require('../controllers/verifyTokenAndUser');




router.post('/payment-sheet',verifyTokenAndUser,paymentSheetController);
router.post('/place-order',placeOrder);

module.exports = router;