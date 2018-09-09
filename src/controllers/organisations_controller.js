const model = require('../models/organisation');
const func = require('./generic');
const faker = require('faker');
faker.locale = "nl";

module.exports = {

  deleteAll(req, res, next) {
    func.deleteAll(req, res, next, model);
  },

  create(req, res, next) {
    func.create(req, res, next, model);
  },

  createMultiple(req, res, next) {
    func.createMultiple(req, res, next, model);
  },

  read(req, res, next) {
    // func.read(req, res, next, model);
    model.findById(req.params.id).populate('persons')
      .then(doc => {
        if (doc === null) {
          res.status(404).send({errorMessage: 'DIT WERKT NIET!'});
        } else {
          res.send(doc);
        }
      })
      .catch(next);
  },

  readMultiple(req, res, next) {
    func.readMultiple(req, res, next, model);
  },

  update(req, res, next) {
    func.update(req, res, next, model);
  },

  updateMultiple(req, res, next) {
    func.updateMultiple(req, res, next, model);
  },

  delete(req, res, next) {
    func.delete(req, res, next, model);
  },

  deleteMultiple(req, res, next) {
    func.deleteMultiple(req, res, next, model);
  },

  createFakeData(req, res, next) {
    const fakeDataO = {
      name: faker.company.companyName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      website: faker.internet.url(),
      zip: faker.address.zipCode(),
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      country: faker.address.country(),
      note: faker.lorem.sentences(),
      image: faker.image.business()
    };
    func.createFakeData(req, res, next, model, 500, 15000, fakeDataO);
  }

};
