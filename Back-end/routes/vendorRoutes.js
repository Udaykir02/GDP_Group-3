const express = require('express');
const router = express.Router();

const { findNearestVendor, insertVendorWithGeopoint, addVendorIdToProducts } = require('../controllers/vendorController');
const { verifyTokenAndUser } = require("../controllers/verifyTokenAndUser");

// Route to find the nearest vendor based on user's current geopoint
router.post('/nearest-vendor', findNearestVendor);

// // Route for adding vendors
// router.post('/vendors', async (req, res) => {
//   try {
//     const newVendor = await vendorController.addVendor(req.body);
//     res.status(201).json(newVendor);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.post('/vendors', insertVendorWithGeopoint);
router.post('/insert', addVendorIdToProducts);

// Define other routes for vendors as needed

module.exports = router;
