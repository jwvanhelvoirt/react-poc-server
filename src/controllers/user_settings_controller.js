const model = require('../models/user_settings');
const func = require('./generic');

module.exports = {

  // THIS IS ALL TEMPORARY.
  // We don't have users yet, so we just create and read one document that serves user settings and stores them.

  read(req, res, next) {
    model.find({})
      .then(doc => {
        if (doc.length === 0) {
          func.create(req, res, next, model);
        } else {
          res.send(doc);
        }
      })
      .catch(next);
  },

  update(req, res, next) {
    func.update(req, res, next, model);
  }

};
