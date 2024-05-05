// Import necessary modules and models
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');

// Route for purchasing products
router.post('/users/:userId/purchase', async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, quantity } = req.body;

        // Find the user and product
        const user = await User.findById(userId);
        const product = await Product.findById(productId);

        if (!user || !product) {
            return res.status(404).json({ message: 'User or product not found' });
        }

        // Check if the product is available in sufficient quantity
        if (product.quantity < quantity) {
            return res.status(400).json({ message: 'Insufficient quantity available' });
        }

        // Calculate total price
        const totalPrice = product.price * quantity;

        // Deduct the purchased quantity from product stock
        product.quantity -= quantity;
        await product.save();

        // Add purchased product to user's purchase history
        user.purchaseHistory.push({
            productId,
            quantity,
            totalPrice,
            purchaseDate: new Date()
        });
        await user.save();

        res.status(200).json({ message: 'Purchase successful', totalPrice });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
