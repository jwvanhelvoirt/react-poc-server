const faker = require('faker');
const _ = require('lodash');
faker.locale = "nl";

const Organisation = require('../models/organisation');
const mongoose = require('mongoose');

const { organisation } = mongoose.connection.collections;

const MINIMUM_RECORDS = 500;
const RECORDS_TO_ADD = 15000;

module.exports = {

/**************** Fake data *****************/
  createFakeData(req, res, next) {
    Organisation.countDocuments({})
      .then(count => {
        if (count < MINIMUM_RECORDS) {
          const records = _.times(RECORDS_TO_ADD, () => createFakeRecords());
          Organisation.insertMany(records);
          res.send({ createFakeData: 'ok' });
        }
      })
      .catch(next);

      function createFakeRecords() {
        return {
          name: faker.name.findName(),
          email: faker.internet.email(),
          phone: faker.phone.phoneNumber(),
          zip: faker.address.zipCode(),
          streetAddress: faker.address.streetAddress(),
          city: faker.address.city(),
          country: faker.address.country(),
          note: faker.lorem.sentences(),
          image: faker.image.people()
        };
      }
  },
/********************************************/

  deleteAll(req, res, next) {
    Organisation.remove({})
      .then(() => res.send({ deleteAll: 'ok' }))
      .catch(next);
    // organisation.drop()
    //   .then(() => res.send({ deleteAll: 'ok' }))
    //   .catch(next);
  },

  create(req, res, next) {
    const organisationProps = req.body;
console.log(req.body);
    Organisation.create(organisationProps)
      .then(org => res.send(org))
      .catch(next);
  },

  createMultiple(req, res, next) {

  },

  read(req, res, next) {
    const organisationId = req.params.id;

    Organisation.findById(organisationId)
      .then(org => {
        console.log(org);
        if (org === null) {
          res.status(404).send({errorMessage: 'DIT WERKT NIET!'});
        } else {
          res.send(org);
        }
      })
      .catch(next);
  },

  readMultiple(req, res, next) {
    const { sort, sortOrder, skip, limit, search } = req.body;
    const searchParams = search ? { $text: { $search: search } } : {};
    const collation = { locale: 'en', strength: 2 }; // For case insensitive sorting.
    Organisation.find(searchParams, null, { collation: collation })
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(limit)
      .then(organisations => {
        const count = 0;
        if (organisations.length > 0 ) {
          // Get the total number of records.
          Organisation.countDocuments(searchParams)
            .then(count => {
              res.send({ count: count, listItems: organisations });
            })
            .catch(next);
        } else {
          res.send({ count: 0, listItems: organisations });
        }
      })
      .catch(next);
  },

  update(req, res, next) {
    const organisationId = req.params.id;
    const organisationProps = req.body;

    Organisation.findByIdAndUpdate({ _id: organisationId }, organisationProps)
      .then(() => Organisation.findById( {_id:  organisationId }))
      .then(org => res.send(org))
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
    Organisation.deleteMany({ _id: { $in: req.body.selectedListItems } })
      .then(organisations => {
        console.log(organisations);
        res.send(organisations);
      })
      .catch(next);
  }

};
