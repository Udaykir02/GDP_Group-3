const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/account');

// Route for adding users
router.post('/users', async (req, res) => {
  try {
    const newUser = await User.addUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for user registration
router.post('/register', async (req, res) => {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ username: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUserObject = {
        userId: req.body.username,
        username: req.body.email,
        hashedAndSaltedPassword: hashedPassword,
        fname: "John",
        lname: "Doe",
        emailVerified: true,
        address: {
            country: "USA",
            street1: "123 Main St",
            street2: "",
            city: "New York",
            state: "NY",
            zip: "10001"
        },
        vendors: [],
        notificationActive: true,
        vendorpreferences: [
            "electronics",
            "clothing"
        ],
        userRecomendations: []
    }
      // Create a new user
      const newUser = new User(newUserObject);
  
      // Save the user to the database
      await newUser.save();
      
      // Return a success message
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
// Route for user login
router.post('/login', async (req, res) => {
    try {
      // Find the user by email
      const user = await User.findOne({ username: req.body.email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(req.body.password, user.hashedAndSaltedPassword);
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
  
      // Return the token
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// Route for resetting user password
router.post('/reset-password', async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ username: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Generate a random temporary password
    const temporaryPassword = Math.random().toString(36).slice(-8);

    // Hash the temporary password
    const hashedTemporaryPassword = await bcrypt.hash(temporaryPassword, 10);

    // Update user's password in the database
    user.hashedAndSaltedPassword = hashedTemporaryPassword;
    await user.save();

    // Send the temporary password to the user through email or other means
    // This step should be implemented according to your application's requirements

    // Return success message
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add this to your userRoutes or a suitable place
router.get('/users/:userId/preferred-products', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const preferredProducts = await Product.find({
      'categories': { $in: user.vendorpreferences }
    });

    res.status(200).json(preferredProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define other routes for users as needed

module.exports = router;
