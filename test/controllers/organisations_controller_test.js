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
          name: 'Philips',
          street: 'Teststreet 1',
          zip: '4546 KL',
          country: 'Nederland',
          email: 'philips@philips.com',
          deliveryMethod: 'fastest'
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
      const organisation = new Organisation({ name: 'eXultance', street: 'Heiligenbos 57', zip: '5351 SW'});
      organisation.save().then(() => {
        request(app)
          .get(`/api/organisations/read/${organisation._id}`)
          .end((err, res) => {
            assert(res.body.street === 'Heiligenbos 57');
            done();
          });
      });
  });

  it('PUT to /api/organisations/update/id edits an existing organisation', done => {
    const organisation = new Organisation({ name: 'eXultance', street: 'Heiligenbos 55', zip: '5351 SW' });
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
    const organisation = new Organisation({ name: 'eXultance', street: 'Heiligenbos 56', zip: '5351 SW' });
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
