var nodemailer = require('nodemailer');
var User = require('../models/account');
const Inventory = require('../models/inventory')
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { generateOTP } = require("../utils/otpUtils")

// Function to send OTP via email
const sendOTPEmail = (email, otp) => {
  try {
    // Integrate with your email service provider here to send the OTP
    // For example, using nodemailer or an email API
    // This is just a placeholder implementation
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    });
    const mailOptions = {
      from: 'no-reply@storegrab.com',
      to: email,
      subject: 'Password Reset',
      text: `Your otp is ${otp}`
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    console.log(`Sending OTP ${otp} to ${email}...`);
    // Example implementation using a console log
  }
  catch (error) {
    console.log(error)
  }

};

const resetPasswordController = async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username: req.body.email });
    if (existingUser) {
      // Generate OTP
      const otp = generateOTP();

      // Send OTP via email
      sendOTPEmail(existingUser.username, otp);

      // Save OTP to existing user
      existingUser.otp = otp;
      await existingUser.save();

      // // Return the generated OTP for further processing
      // return otp;
    }

    res.status(201).json({ message: 'If there is email id registered, you will be sent an otp ' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a customer in Stripe
    const customer = await stripe.customers.create();

    // Generate an ephemeral key for the customer
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2024-04-10' }
    );

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
      userRecomendations: [],
      customer: customer,
      ephemeralKey: ephemeralKey
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
}

const loginUser = async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ username: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the user is blocked
    if (user.blocked) {
      return res.status(403).json({ message: 'User is blocked. Please contact support.' });
    }

    // Check if the user has exceeded the login attempts limit
    if (user.loginAttempts >= 5) {
      // Block the user
      user.blocked = true;
      await user.save();
      return res.status(403).json({ message: 'User has exceeded login attempts limit. User is now blocked.' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(req.body.password, user.hashedAndSaltedPassword);
    if (!passwordMatch) {
      user.loginAttempts += 1;
      await user.save();
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Reset login attempts on successful login
    user.loginAttempts = 0;
    user.otpAttempts = 0;
    await user.save();
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '12h' });

    // Return the token
    res.status(200).json({ token: token, userData: { userId: user.userId, email: user.username, fname: user.fname, lname: user.lname, emailVerified: user.emailVerified, address: user.address, vendors: user.vendors, notificationActive: user.notificationActive, vendorpreferences: user.vendorpreferences, userRecomendations: user.userRecomendations, cart: user.cart } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const verifyOtp = async (req, res) => {
  try {

    const { enteredOTP } = req.body;
    // Find the user by email
    const existingUser = await User.findOne({ username: req.body.email });
    if (!existingUser) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the user is blocked
    if (existingUser.otpAttempts > 5) {
      return res.status(403).json({ message: 'User is blocked. Please contact support.' });
    }

    // Check if the user has exceeded the login attempts limit
    if (existingUser.otpAttempts >= 5) {
      // Block the user
      existingUser.blocked = true;
      await existingUser.save();
      return res.status(403).json({ message: 'User has exceeded otp attempts limit. User is now blocked.' });
    }

    // Compare the entered OTP with the OTP saved in the user's document
    if (Number(existingUser.otp) !== Number(enteredOTP)) {
      existingUser.otpAttempts += 1;
      await user.save();
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP is valid, clear the OTP field in the user's document
    existingUser.otp = undefined;
    existingUser.loginAttempts = 0;
    existingUser.otpAttempts = 0;
    await existingUser.save();
    // Generate JWT token
    const token = jwt.sign({ userId: existingUser._id }, 'your_secret_key', { expiresIn: '1h' });

    // Return the token
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const resetPasswordPostToken = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    // Find the user by email
    const existingUser = await User.findOne({ username: email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update the user's password
    existingUser.hashedAndSaltedPassword = hashedPassword;
    await existingUser.save();

    // Password reset successful
    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Password reset failed:', error.message);
    return res.status(500).json({ message: 'Password reset failed' });
  }
}

// Controller function to add inventory items to the user's cart and update inventory quantity
const addToCart = async (userId, skuId, qty) => {
  try {
    // Find the user by userId
    console.log(userId+"--->")
    const user = await User.findOne({ userId });

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // Find the inventory item by skuId
    const inventoryItem = await Inventory.findOne({ skuId });

    if (!inventoryItem) {
      return { success: false, message: 'Inventory item not found' };
    }

    // Check if the requested quantity is available
    if (inventoryItem.qty < qty) {
      return { success: false, message: 'Insufficient quantity available' };
    }

    // Update the inventory quantity
    inventoryItem.qty -= qty;
    await inventoryItem.save();

    // Check if the item already exists in the user's cart
    const existingCartItemIndex = user.cart.findIndex(item => item.skuId === skuId);

    if (existingCartItemIndex !== -1) {
      // Update the quantity of the existing item in the cart
      user.cart[existingCartItemIndex].qty += qty;
      if(user.cart[existingCartItemIndex].qty === 0){
        user.cart.splice(existingCartItemIndex,1) 
      }
    } else {
      // Add the item to the cart if it doesn't exist
      user.cart.push({
        skuId: skuId,
        item: inventoryItem.item,
        price: inventoryItem.price,
        qty: qty,
        size: inventoryItem.size,
        features: inventoryItem.features,
        description: inventoryItem.description,
        categories: inventoryItem.categories,
        image: inventoryItem.image,
        brand: inventoryItem.brand
      });
    }

    // Save the updated user document
    await user.save();

    return { success: true, data: {message: 'Item added to cart successfully', user: user} };
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return { success: false, message: 'Error adding item to cart' };
  }
};

const addToCartController = async (req, res) => {
  const { userId, skuId, qty } = req.body;

  try {
    const result = await addToCart(userId, skuId, qty);
    if (result.success) {
      res.status(200).json({ message: result.message, data: result.data });
    } else {
      console.log(result.message)
      res.status(400).json({ error: result.message });
    }
  } catch (error) {
    
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const renewToken = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken; // Assuming the refresh token is sent in the request body

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, 'your_secret_key');

    // Check if the user exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a new access token
    const accessToken = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '12h' });

    // Return the new access token
    res.status(200).json({ token: accessToken, userData: { userId: user?.userId, email: user?.username, fname: user?.fname, lname: user?.lname, emailVerified: user?.emailVerified, address: user?.address, vendors: user?.vendors, notificationActive: user?.notificationActive, vendorpreferences: user?.vendorpreferences, userRecomendations: user?.userRecomendations, cart: user?.cart } });
  } catch (error) {
    // If token verification fails or any other error occurs, return an error response
    res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
}




// module.exports = {
//   addUser: async (userData) => {
//     try {
//       return await User.insertMany(userData);
//     } catch (error) {
//       console.error("Error adding users:", error);
//       throw new Error('Failed to add users to the database');
//     }
//   },
//   // Other user-related controller functions...
// };

module.exports = { registerUser, loginUser, resetPasswordController, verifyOtp, resetPasswordPostToken, addToCartController, renewToken }