const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
    skuId: String,
    item: String,
    price: Number,
    qty: Number,
    size: {
        h: Number,
        l: Number,
        w: Number
    },
    features: String,
    categories: [String],
    image: String,
    description: String,
    brand: String
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

const orderSchema = new Schema({
    orderId: String,
    userId: String,
    paymentId: String,
    vendorId: String,
    paymentStatus: String,
    paymentMethod: String,
    status: String,
    currency: String,
    totalCost: Number,
    items: [itemSchema],
    shipping: shippingSchema,
    orderTime: { type: Date, default: Date.now }, // Add order time field with default value of current time
    endTime: { type: Date }
});

// Add a virtual field to calculate end time based on order time
orderSchema.virtual('endTimeCalc').get(function() {
    return new Date(this.orderTime.getTime() + 3 * 24 * 60 * 60 * 1000); 
});

// Set endTime using the virtual field
orderSchema.pre('save', function(next) {
    this.endTime = this.endTimeCalc;
    next();
});

const order = mongoose.model('Order', orderSchema);

module.exports = order;