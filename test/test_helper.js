const mongoose = require('mongoose');

before(done => {
  // Connect mongoose library to the correct mongo database.
  mongoose.connect('mongodb://localhost/poc_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', err => console.warn('Warning', err));
});

beforeEach(done => {
  const { organisations } = mongoose.connection.collections;

  // Drop the organisations collection before the execution of every testscript.
  organisations.remove({})
    .then(() => done())
    .catch(() => done());
});
