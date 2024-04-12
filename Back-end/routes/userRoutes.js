const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for adding users
router.post('/users', async (req, res) => {
  try {
    const newUser = await userController.addUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define other routes for users as needed

module.exports = router;