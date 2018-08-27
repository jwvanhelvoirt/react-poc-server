const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  image: { type: String },
  persons: [{
    type: Schema.Types.ObjectId,
    ref: 'person'
  }]
});

// OrganisationSchema.pre('remove', function(next) {
//   // In case an organisation is removed, remove all related persons.
//   const Person = mongoose.model('person'); // Nooit via require doen!!
//
//   // this is a reference to the person to be removed.
//   Person.remove({ _id: { $in: this.person } }) // OF MOET DIT this.persons zijn???
//     .then(() => next()); // after related persons have been removed, continue with removing the organisation.
// });

// OrganisationSchema.post('remove', function(next) {
//   // hier kunnen functies uitgevoerd worden, nadat een organisatie is verwijderd.
// });

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

module.exports = Organisation;


/*
Verschillende smaken:
driving: {
  type: Boolean,
  default: false
}
*/
