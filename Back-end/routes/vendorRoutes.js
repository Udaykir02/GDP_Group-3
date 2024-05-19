const express = require('express');
const router = express.Router();

const { findNearestVendor, insertVendorWithGeopoint, addVendorIdToProducts, getVendorsByIds } = require('../controllers/vendorController');
const { verifyTokenAndUser } = require("../controllers/verifyTokenAndUser");

// Route to find the nearest vendor based on user's current geopoint
router.post('/nearest-vendor',verifyTokenAndUser, findNearestVendor);
router.post('/vendors', insertVendorWithGeopoint);
router.post('/insert', addVendorIdToProducts);
router.post('/getVendorByIds', verifyTokenAndUser, getVendorsByIds);

// Define other routes for vendors as needed

module.exports = router;
