
// Assuming Mongoose for MongoDB
const userSchema = new mongoose.Schema({
    // existing fields
    cart: [{
        productId: mongoose.Schema.Types.ObjectId,
        quantity: Number,
        dateAdded: { type: Date, default: Date.now }
    }]
});
