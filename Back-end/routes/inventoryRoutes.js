const express = require('express');
const router = express.Router();
const {insertInventory, getInventoryBySkuId, updateInventory, getInventoryQty, getInventoryAndVendorDetails, getInventoryQuantotyInArray } = require('../controllers/inventoryController');

// Route for adding inventory
router.post('/inventory', async (req, res) => {
  try {
    const newInventory = await inventoryController.addInventory(req.body);
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/insert',insertInventory);

router.post('/getInventory',getInventoryBySkuId);

router.post('/updateInventory',updateInventory);

router.post('/getInventoryQty',getInventoryQty);

router.post('/search',getInventoryAndVendorDetails)

router.post('/getInventoryQuantity',getInventoryQuantotyInArray);

// Define other routes for inventory as needed

module.exports = router;