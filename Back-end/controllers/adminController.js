// controllers/adminController.js
const User = require('../models/user');

exports.getAllUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw new Error('Failed to fetch users.');
    }
};

exports.updateUser = async (userId, userData) => {
    try {
        return await User.findByIdAndUpdate(userId, userData, { new: true });
    } catch (error) {
        throw new Error('Failed to update user.');
    }
};
