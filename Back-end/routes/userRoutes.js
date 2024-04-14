const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/account');

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

// Define other routes for users as needed

module.exports = router;