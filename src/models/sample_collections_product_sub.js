const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.']
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product'
  }
});

const SubProduct = mongoose.model('subProduct', SubProductSchema);

module.exports = SubProduct;
