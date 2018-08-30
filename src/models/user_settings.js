const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSettingsSchema = new Schema({
  language: { type: String }
});

const UserSettings = mongoose.model('user_settings', UserSettingsSchema);

module.exports = UserSettings;
