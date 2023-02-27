const express = require('express');

const { handleSuccess } = require('../src/utils/responses/success');
const { handleError } = require('../src/utils/responses/error');

const { Ok, Created } = require('./utils/responses/success/successes');
const app = express();

app.get('/', (req, res, next) => {
  next(new Created('hi', 'blue'));
});

app.use('/api/v1', require('./app/routes/mainRouter'));

app.use((service, req, res, next) => {
  if (service instanceof Error) {
    return handleError(service, req, res);
  }
  return handleSuccess(service, req, res);
});

module.exports = app;
