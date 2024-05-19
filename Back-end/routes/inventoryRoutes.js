const express = require('express');
const router = express.Router();
const {insertInventory, getInventoryBySkuId, updateInventory, getInventoryQty, getInventoryAndVendorDetails, getInventoryQuantotyInArray, increaseQty, decreaseQty } = require('../controllers/inventoryController');
const { verifyTokenAndUser } = require('../controllers/verifyTokenAndUser');


router.post('/insert',insertInventory);

router.post('/getInventory',getInventoryBySkuId);

router.post('/updateInventory',updateInventory);

router.post('/getInventoryQty',getInventoryQty);

router.post('/search',getInventoryAndVendorDetails)

router.post('/getInventoryQuantity',getInventoryQuantotyInArray);

router.post('/increaseQty',verifyTokenAndUser,increaseQty);

router.post('/decreaseQty',verifyTokenAndUser, decreaseQty);

// Define other routes for inventory as needed

module.exports = router;