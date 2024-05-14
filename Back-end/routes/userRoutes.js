const express = require('express');
const router = express.Router();
const { registerUser, loginUser, resetPasswordController, verifyOtp, resetPasswordPostToken, addToCartController } = require("../controllers/userController");
const { verifyTokenAndUser } = require('../controllers/verifyTokenAndUser');

// // Route for adding users
// router.post('/users', async (req, res) => {
//   try {
//     const newUser = await User.addUser(req.body);
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for user login
router.post('/reset', resetPasswordController);

router.post('/verify',verifyOtp);

router.post('/password-reset',verifyTokenAndUser,resetPasswordPostToken)

router.post('/addToCart',verifyTokenAndUser,addToCartController)



// Define other routes for users as needed

module.exports = router;