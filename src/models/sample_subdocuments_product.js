const mongoose = require('mongoose');
const SubProductSchema = require('./sample_subdocuments_product_sub');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.']
  },
  subProducts: [SubProductSchema]
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
