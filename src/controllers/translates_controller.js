const model = require('../models/translates');
const func = require('./generic');

module.exports = {

  read(req, res, next) {
    model.find({ language: req.params.lang })
      .then(doc => res.send(doc))
      .catch(next);
  }

};
