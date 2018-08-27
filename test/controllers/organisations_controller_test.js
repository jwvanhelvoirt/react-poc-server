const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Organisation = mongoose.model('organisation');

describe('Organisations controller', () => {
  it('Post to /api/organisations/create creates a new organisation', done => {
    Organisation.countDocuments().then(count => {
      request(app)
        .post('/api/organisations/create')
        .send( {
          name: 'Siemens',
          email: 'info@siemens.com',
          phone: '030-3839302',
          website: 'http://www.siemens.nl',
          zip: '4546 KL',
          streetAddress: 'Lageweide 1',
          city: 'Utrecht',
          country: 'Nederland',
          organisationManager: 'jos',
          note: 'Siemens is een high tech bedrijf...'
        })
        .end(() => {
          Organisation.countDocuments().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it('GET to /api/organisations/read/id returns an existing organisation', done => {
      const organisation = new Organisation({
        name: 'eXultance',
        zip: '5351 SW',
        streetAddress: 'Heiligenbos 57',
        city: 'Berghem',
        country: 'Nederland'
      });
      organisation.save().then(() => {
        request(app)
          .get(`/api/organisations/read/${organisation._id}`)
          .end((err, res) => {
            assert(res.body.streetAddress === 'Heiligenbos 57');
            done();
          });
      });
  });

  it('PUT to /api/organisations/update/id edits an existing organisation', done => {
    const organisation = new Organisation({
      name: 'eXultance',
      zip: '5351 SW',
      streetAddress: 'Heiligenbos 55',
      city: 'Berghem',
      country: 'Nederland'
    });
    organisation.save().then(() => {
      request(app)
        .put(`/api/organisations/update/${organisation._id}`)
        .send({ zip: '6666 BB' })
        .end(() => {
          Organisation.findById(organisation._id)
            .then(org => {
                assert(org.zip === '6666 BB');
                done();
            });
        });
    });
  });

  it('DELETE to /api/organisations/delete/id can delete an organisation', done => {
    const organisation = new Organisation({
      name: 'eXultance',
      zip: '5351 SW',
      streetAddress: 'Heiligenbos 56',
      city: 'Berghem',
      country: 'Nederland'
     });
    organisation.save().then(() => {
      request(app)
        .delete(`/api/organisations/delete/${organisation._id}`)
        .end(() => {
          Organisation.findById(organisation._id)
            .then(org => {
              assert(org === null);
              done();
            })
        })
    });
  });

});
