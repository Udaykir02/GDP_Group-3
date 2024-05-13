const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
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

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
