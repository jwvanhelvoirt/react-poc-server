const model = require('../models/person');
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
    model.findById(req.params.id).populate('organisations')
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
    // func.readMultiple(req, res, next, model);
    const { sort, sortOrder, skip, limit, search } = req.body;
    const searchParams = search ? { $text: { $search: search } } : {};
    const collation = { locale: 'en', strength: 2 }; // For case insensitive sorting.
    model.find(searchParams, null, { collation: collation })
      .populate('organisations')
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(limit)
      .then(docs => {
        const count = 0;
        if (docs.length > 0 ) {
          // Get the total number of records.
          model.countDocuments(searchParams)
            .then(count => res.send({ count: count, listItems: docs }))
            .catch(next);
        } else {
          res.send({ count: 0, listItems: docs });
        }
      })
      .catch(next);
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
    const fakeDataP = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      zip: faker.address.zipCode(),
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      country: faker.address.country(),
      note: faker.lorem.sentences(),
      image: faker.image.people()
    };
    func.createFakeData(req, res, next, model, 1000, 30000, fakeDataP);
  }

};
