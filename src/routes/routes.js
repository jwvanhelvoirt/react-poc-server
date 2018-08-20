const OrganisationsController = require('../controllers/organisations_controller');
// const PersonsController = require('../controllers/persons_controller');

// Watch for incoming requests to the route http://localhost:3050/api
module.exports = (app) => {

  // Routes for organisations.
  app.post(   '/api/organisations/create',          OrganisationsController.create);
  app.post(   '/api/organisations/create_multiple', OrganisationsController.createMultiple);
  app.get(    '/api/organisations/read/:id',        OrganisationsController.read);
  app.get(    '/api/organisations/read_multiple',   OrganisationsController.readMultiple);
  app.put(    '/api/organisations/update/:id',      OrganisationsController.update);
  app.put(    '/api/organisations/update_multiple', OrganisationsController.updateMultiple);
  app.delete( '/api/organisations/delete/:id',      OrganisationsController.delete);
  app.delete( '/api/organisations/delete_multiple', OrganisationsController.deleteMultiple);

  // Routes for persons.
  // app.post(   '/api/persons/create',     PersonsController.create);
  // app.get(    '/api/persons/read/:id',   PersonsController.read);
  // app.put(    '/api/persons/update/:id', PersonsController.update);
  // app.delete( '/api/persons/delete/:id', PersonsController.delete);

}
