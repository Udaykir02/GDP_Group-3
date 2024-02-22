const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  sku: String,
  quantity: String,
  price: Number,
  discount: Number,
  preTaxTotal: Number,
  tax: Number,
  total: Number
});

const addressSchema = new Schema({
  street1: String,
  street2: String,
  city: String,
  state: String,
  country: String,
  zip: String
});

const shippingSchema = new Schema({
  address: addressSchema,
  origin: addressSchema,
  carrier: String,
  tracking: String
});

const paymentSchema = new Schema({
  userId: String,
  paymentId: String,
  vendorId: String,
  paymentStatus: String,
  status: String,
  currency: String,
  totalCost: Number,
  items: [itemSchema],
  shipping: shippingSchema
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;