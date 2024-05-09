const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const vendorSchema = new Schema({
    vendorId: String,
    vendor_name: String,
    vendor_description: String,
    vendor_location: String,
    vendor_contact_info: String,
    website: String,
    rating: Number,
    founded_year: Number,
    employees: Number,
    geopoint: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] } // Default to [0, 0] if not provided
    }
});

// Index for geospatial queries
vendorSchema.index({ geopoint: '2dsphere' }); // Define 2dsphere index for geopoint field

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
