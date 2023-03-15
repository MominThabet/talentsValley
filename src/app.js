const express = require('express');
const cors = require('cors');
const { handleSuccess } = require('../src/utils/responses/success');
const { handleError } = require('../src/utils/responses/error');

const { Ok, Created } = require('./utils/responses/success/successes');
const app = express();
const { isAuthenticated, isTeamAuth } = require('./utils/middleware/auth/auth');
app.disable('X-Powered-By');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.get('/', (req, res, next) => {
  next(new Created('hi', 'blue'));
});

app.get('/tokentest', isAuthenticated, isTeamAuth, (req, res) => {
  return res.json(req.user);
});

app.use('/api/v1', require('./app/routes/mainRouter'));

app.use((service, req, res, next) => {
  if (service instanceof Error) {
    return handleError(service, req, res);
  }
  return handleSuccess(service, req, res);
});

module.exports = app;
