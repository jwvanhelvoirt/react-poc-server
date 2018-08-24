const faker = require('faker');
const _ = require('lodash');
faker.locale = "nl";

module.exports = {

  create: (req, res, next, model) => {
    model.create(req.body)
      .then(doc => res.send(doc))
      .catch(next);
  },

  createMultiple: (req, res, next, model) => {
  },

  read: (req, res, next, model) => {
    model.findById(req.params.id)
      .then(doc => {
        if (doc === null) {
          res.status(404).send({errorMessage: 'DIT WERKT NIET!'});
        } else {
          res.send(doc);
        }
      })
      .catch(next);
  },

  readMultiple: (req, res, next, model) => {
    const { sort, sortOrder, skip, limit, search } = req.body;
    const searchParams = search ? { $text: { $search: search } } : {};
    const collation = { locale: 'en', strength: 2 }; // For case insensitive sorting.
    model.find(searchParams, null, { collation: collation })
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

  update: (req, res, next, model) => {
    model.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then(() => model.findById( {_id:  req.params.id }))
      .then(doc => res.send(doc))
      .catch(next);
  },

  updateMultiple: (req, res, next, model) => {
  },

  delete: (req, res, next, model) => {
    model.findByIdAndRemove({ _id: req.params.id })
      .then(org => res.status(204).send(org))
      .catch(next);
  },

  deleteMultiple: (req, res, next, model) => {
    model.deleteMany({ _id: { $in: req.body.selectedListItems } })
      .then(docs => res.send(docs))
      .catch(next);
  },

  deleteAll: (req, res, next, model) => {
    model.remove({})
      .then(() => res.send({ deleteAll: 'ok' }))
      .catch(next);
  },

  createFakeData: (req, res, next, model, minRecords, docsToAdd, fakeData) => {
    model.countDocuments({})
      .then(count => {
        if (count < minRecords) {
          const records = _.times(docsToAdd, () => createFakeRecords());
          model.insertMany(records);
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
  }

};
