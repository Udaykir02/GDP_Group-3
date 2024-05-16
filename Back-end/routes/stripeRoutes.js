const express = require('express');
const router = express.Router();
const { paymentSheetController } = require('../controllers/stripeController');
const { verifyTokenAndUser } = require('../controllers/verifyTokenAndUser');




router.post('/payment-sheet',verifyTokenAndUser,paymentSheetController);

module.exports = router;