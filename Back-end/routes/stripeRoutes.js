const express = require('express');
const router = express.Router();
const { paymentSheetController } = require('../controllers/stripeController');




router.post('/payment-sheet',paymentSheetController);

module.exports = router;