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
  },

  createLogin(req, res, next) {
    const { username, password, rememberPrevLogin } = req.body;
    model.find({})
      .then(doc => {
        if (doc.length === 0) {
          res.send({ authorized: false });
        } else {
          if (doc[0].username === username && doc[0].password === password) {
            // Return magic, rememberPrevLogin and username to update localStorage.
            res.send({ authorized: true, magic: doc[0].magic, rememberPrevLogin, username });
          } else {
            res.send({ authorized: false });
          }
        }
      })
      .catch(next);
  },

  checkMagic(req, res, next) {
    const { magic } = req.body;
    model.find({})
      .then(doc => {
        if (doc.length === 0) {
          res.send({ magic: false });
        } else {
          if (doc[0].magic === magic) {
            res.send({ magic: true });
          } else {
            res.send({ magic: false });
          }
        }
      })
      .catch(next);
  }

};
