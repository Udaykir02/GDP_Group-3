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
  products: [String]
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
