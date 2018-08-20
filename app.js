const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./src/routes/routes');
const app = express();

// mongoose.Promise = globale.Promise; // Hoeft niet meer.
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/poc');
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// disable eTag, to prevent a 304 (client browser cache) which would avoid a view refresh.
app.set('etag', false);

// cluster parts of the request body into req.body
app.use(bodyParser.json());

// setup all the different routes of our application.
routes(app);

// error handling of errors caused during request handling.
// 'err' contains error information.
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
