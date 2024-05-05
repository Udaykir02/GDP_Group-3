// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');

// Admin route to view all users
router.get('/admin/users', adminAuth, async (req, res) => {
    try {
        const users = await adminController.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin route to update user roles or other information
router.put('/admin/users/:userId', adminAuth, async (req, res) => {
    try {
        const updatedUser = await adminController.updateUser(req.params.userId, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Other admin-specific routes like managing products, vendors, etc.
// ...

module.exports = router;
