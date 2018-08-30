const model = require('../models/translates');
const func = require('./generic');

module.exports = {

  read(req, res, next) {
    console.log(req.params);
    model.find({ language: req.params.lang })
      .then(doc => res.send(doc))
      .catch(next);
  }

};
