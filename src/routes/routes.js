const OrganisationsController = require('../controllers/organisations_controller');
const PersonsController = require('../controllers/persons_controller');

// Watch for incoming requests to the route http://localhost:3050/api
module.exports = (app) => {

  // Routes for organisations.
  app.post(   '/api/organisations/create_fake_data',  OrganisationsController.createFakeData);
  app.post(   '/api/organisations/create',            OrganisationsController.create);
  app.post(   '/api/organisations/create_multiple',   OrganisationsController.createMultiple);
  app.get(    '/api/organisations/read/:id',          OrganisationsController.read);
  app.post(   '/api/organisations/read_multiple',     OrganisationsController.readMultiple);
  app.put(    '/api/organisations/update/:id',        OrganisationsController.update);
  app.put(    '/api/organisations/update_multiple',   OrganisationsController.updateMultiple);
  app.delete( '/api/organisations/delete/:id',        OrganisationsController.delete);
  app.post(   '/api/organisations/delete_multiple',   OrganisationsController.deleteMultiple);
  app.delete( '/api/organisations/delete_all',        OrganisationsController.deleteAll);

  // Routes for persons.
  app.post(   '/api/persons/create_fake_data',  PersonsController.createFakeData);
  app.post(   '/api/persons/create',            PersonsController.create);
  app.post(   '/api/persons/create_multiple',   PersonsController.createMultiple);
  app.get(    '/api/persons/read/:id',          PersonsController.read);
  app.post(   '/api/persons/read_multiple',     PersonsController.readMultiple);
  app.put(    '/api/persons/update/:id',        PersonsController.update);
  app.put(    '/api/persons/update_multiple',   PersonsController.updateMultiple);
  app.delete( '/api/persons/delete/:id',        PersonsController.delete);
  app.post(   '/api/persons/delete_multiple',   PersonsController.deleteMultiple);
  app.delete( '/api/persons/delete_all',        PersonsController.deleteAll);

}
