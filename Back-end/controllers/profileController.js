// controllers/profileController.js
const User = require('../models/user');

// Controller function for retrieving user profile
exports.getUserProfile = async (req, res) => {
    try {
        // Retrieve user profile based on authenticated user (you may need to implement authentication middleware)
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function for updating user profile
exports.updateUserProfile = async (req, res) => {
    try {
        // Update user profile based on authenticated user (you may need to implement authentication middleware)
        const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
