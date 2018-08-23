const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
*name
*email
*phone
*website
*zip
*streetAddress
*city
*country
*organisationManager
*note
image*/

const OrganisationSchema = new Schema({
  name: { type: String, required: [true, 'Naam is verplicht.'] },
  email: { type: String },
  phone: { type: String },
  website: { type: String },
  zip: {
    type: String,
    required: [true, 'Postcode is verplicht.'],
    validate: {
      validator: (zip) => zip.length === 7,
      message: 'Postcode bestaat uit 7 karakters.'
    }
  },
  streetAddress: { type: String, required: [true, 'Straat is verplicht.'] },
  city: { type: String, required: [true, 'Plaats is verplicht.'] },
  country: { type: String, required: [true, 'Land is verplicht.'] },
  organisationManager: { type: String },
  note: { type: String },
  image: { type: String }
});

OrganisationSchema.options.autoIndex = true;

OrganisationSchema.index(
  {
    name: 'text',
    email: 'text',
    streetAddress: 'text',
    city: 'text'
  },
  { default_language: "dutch" },
  { name: "TextIndexOrganisations" }
);

const Organisation = mongoose.model('organisation', OrganisationSchema);

// Organisation.on('index', function(error) {
//   console.log("Error during text index creation.");
// });

module.exports = Organisation;


/*
Verschillende smaken:
driving: {
  type: Boolean,
  default: false
}
*/
