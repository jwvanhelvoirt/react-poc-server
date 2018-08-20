const Organisation = require('../models/organisation');
const mongoose = require('mongoose');

module.exports = {

  create(req, res, next) {
    const organisationProps = req.body;

    Organisation.create(organisationProps)
      .then(organisation => res.send(organisation))
      .catch(next);
  },

  createMultiple(req, res, next) {

  },

  read(req, res, next) {
    const organisationId = req.params.id;

    Organisation.findById(organisationId)
      .then(org => res.send(org))
      .catch(next);
  },

  readMultiple(req, res, next) {
    const collation = { locale: 'en', strength: 2 };
    Organisation.find({}, null, { collation: collation })
      .sort({ name: 1 })
      .skip()
      .limit()
      .then(organisations => res.send(organisations))
      .catch(next);
  },

  update(req, res, next) {
    const organisationId = req.params.id;
    const organisationProps = req.body;

    Organisation.findByIdAndUpdate({ _id: organisationId }, organisationProps)
      .then(() => Organisation.findById( {_id:  organisationId }))
      .then(org => {
        res.send(org);
      })
      .catch(next);
  },

  updateMultiple(req, res, next) {

  },

  delete(req, res, next) {
    const organisationId = req.params.id;

    Organisation.findByIdAndRemove({ _id: organisationId })
      .then(org => res.status(204).send(org))
      .catch(next);
  },

  deleteMultiple(req, res, next) {

  },

};
