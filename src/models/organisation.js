const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganisationSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.']
  },
  street: {
    type: String,
    required: [true, 'Street is required.']
  },
  zip: {
    type: String,
    validate: {
      validator: (zip) => zip.length === 7,
      message: 'ZIP must be 7 characters.'
    },
    required: [true, 'ZIP is required.']
  },
  country: {
    type: String
  },
  email: {
    type: String
  },
  deliveryMethod: {
    type: String
  }
});

const Organisation = mongoose.model('organisation', OrganisationSchema);

module.exports = Organisation;


/*
Verschillende smaken:
driving: {
  type: Boolean,
  default: false
}
*/
