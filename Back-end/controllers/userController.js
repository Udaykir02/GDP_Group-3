var nodemailer = require('nodemailer');
var User = require('../models/account');

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
}

const loginUser = async (req, res) => {
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
}

const verifyOtp = async (req, res) => {
  try {

    const { enteredOTP } = req.body.enteredOTP;
    // Find the user by email
    const existingUser = await User.findOne({ username: req.body.email });
    if (!existingUser) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the entered OTP with the OTP saved in the user's document
    if (existingUser.otp !== Number(enteredOTP)) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP is valid, clear the OTP field in the user's document
    existingUser.otp = undefined;
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

    // Update the user's password
    existingUser.password = newPassword;
    await existingUser.save();

    // Password reset successful
    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Password reset failed:', error.message);
    return res.status(500).json({ message: 'Password reset failed' });
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

module.exports = { registerUser, loginUser, resetPasswordController, verifyOtp, resetPasswordPostToken }