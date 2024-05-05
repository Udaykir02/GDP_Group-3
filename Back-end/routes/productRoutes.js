// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Route for creating a new product
router.post('/products', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route for retrieving all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/products', async (req, res) => {
    try {
        let query = {};

        // Filter by category if provided
        if (req.query.category) {
            query.category = req.query.category;
        }

        // Filter by price range if provided
        if (req.query.minPrice && req.query.maxPrice) {
            query.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
        } else if (req.query.minPrice) {
            query.price = { $gte: req.query.minPrice };
        } else if (req.query.maxPrice) {
            query.price = { $lte: req.query.maxPrice };
        }

        // Add more filters as needed (e.g., brand, color, etc.)

        const products = await Product.find(query);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add more routes for updating, deleting, and searching products as needed

module.exports = router;
