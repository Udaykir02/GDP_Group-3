const Product = require('../models/product');

exports.getProductsByVendor = async (vendorId) => {
    try {
        return await Product.find({ vendorId: vendorId });
    } catch (error) {
        throw new Error('Failed to retrieve products.');
    }
};