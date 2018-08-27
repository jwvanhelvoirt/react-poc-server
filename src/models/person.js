const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: { type: String, required: [true, 'Naam is verplicht.'] },
  email: { type: String },
  phone: { type: String },
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
  organisations: [{
    type: Schema.Types.ObjectId,
    ref: 'organisation'
  }]
});

PersonSchema.options.autoIndex = true;
PersonSchema.index(
  {
    name: 'text',
    email: 'text',
    streetAddress: 'text',
    city: 'text'
  },
  { default_language: "dutch" },
  { name: "TextIndexOrganisations" }
);

const Person = mongoose.model('person', PersonSchema);

module.exports = Person;
