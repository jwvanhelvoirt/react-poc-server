const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TranslatesSchema = new Schema({
  language: { type: String },
  translates: { type: Object }
});

const Translates = mongoose.model('translates', TranslatesSchema);

module.exports = Translates;
