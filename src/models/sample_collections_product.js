const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.']
  },
  subProducts: [{
    type: Schema.Types.ObjectId,
    ref: 'subProduct'
  }]
});

// ProductSchema.virtual('propertyName').get(function() {
//   return 'Dit kan van alles zijn';
// });

ProductSchema.pre('remove', function(next) {
  // In case a product is removed, remove all related subproducts.
  const SubProduct = mongoose.model('subProduct'); // Nooit via require doen!!

  // this is a reference to the product to be removed.
  SubProduct.remove({ _id: { $in: this.subProduct } })
    .then(() => next()); // after related subproducts have been removed, continue with removing the product.
});

// ProductSchema.post('remove', function(next) {
//   // hier kunnen functies uitgevoerd worden, nadat een product is verwijderd.
// });

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
