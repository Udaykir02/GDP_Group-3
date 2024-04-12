const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Route for adding inventory
router.post('/inventory', async (req, res) => {
  try {
    const newInventory = await inventoryController.addInventory(req.body);
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define other routes for inventory as needed

module.exports = router;