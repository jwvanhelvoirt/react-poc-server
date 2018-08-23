const faker = require('faker');
const _ = require('lodash');
faker.locale = "nl";

const Person = require('../models/person');
const mongoose = require('mongoose');

const { person } = mongoose.connection.collections;

const MINIMUM_RECORDS = 1000;
const RECORDS_TO_ADD = 30000;

module.exports = {

  /**************** Fake data *****************/
  createFakeData(req, res, next) {
    Person.countDocuments({})
      .then(count => {
        if (count < MINIMUM_RECORDS) {
          const records = _.times(RECORDS_TO_ADD, () => createFakeRecords());
          Person.insertMany(records);
          res.send({ createFakeData: 'ok' });
        }
      })
      .catch(next);

      function createFakeRecords() {
        return {
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
      }
  },
  /********************************************/

  deleteAll(req, res, next) {
    Person.remove({})
      .then(() => res.send({ deleteAll: 'ok' }))
      .catch(next);
    // person.drop()
    //   .then(() => res.send({ deleteAll: 'ok' }))
    //   .catch(next);
  },

  create(req, res, next) {
    const personProps = req.body;
console.log(req.body);
    Person.create(personProps)
      .then(prs => res.send(prs))
      .catch(next);
  },

  createMultiple(req, res, next) {

  },

  read(req, res, next) {
    const personId = req.params.id;

    Person.findById(personId)
      .then(prs => {
        console.log(prs);
        if (prs === null) {
          res.status(404).send({errorMessage: 'DIT WERKT NIET!'});
        } else {
          res.send(prs);
        }
      })
      .catch(next);
  },

  readMultiple(req, res, next) {
    const { sort, sortOrder, skip, limit } = req.body;
// console.log(req.body);
    const collation = { locale: 'en', strength: 2 }; // For case insensitive sorting.
    Person.find({}, null, { collation: collation })
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(limit)
      .then(persons => {
        const count = 0;
        if (persons.length > 0 ) {
          // Get the total number of records.
          Person.countDocuments({})
            .then(count => {
              res.send({ count: count, listItems: persons });
            })
            .catch(next);
        } else {
          res.send({ count: 0, listItems: persons });
        }
      })
      .catch(next);
  },

  update(req, res, next) {
    const personId = req.params.id;
    const personProps = req.body;

    Person.findByIdAndUpdate({ _id: personId }, personProps)
      .then(() => Person.findById( {_id:  personId }))
      .then(prs => res.send(prs))
      .catch(next);
  },

  updateMultiple(req, res, next) {

  },

  delete(req, res, next) {
    const personId = req.params.id;

    Person.findByIdAndRemove({ _id: personId })
      .then(org => res.status(204).send(org))
      .catch(next);
  },

  deleteMultiple(req, res, next) {
    Person.deleteMany({ _id: { $in: req.body.selectedListItems } })
      .then(persons => {
        console.log(persons);
        res.send(persons);
      })
      .catch(next);
  }

};
