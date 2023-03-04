const express = require('express');
const {
  Created,
  Ok,
} = require('../../../../utils/responses/success/successes');
const {
  signup,
  login,
  sendCodeToEmail,
} = require('../../../validationSchema/user');
const controller = require('../../../controller/user');

const { validateRequest } = require('../../../../utils/validation');
const { isAuthenticated } = require('../../../../utils/middleware/auth/auth');
const router = express.Router();

router.post('/signup', [signup, validateRequest], controller.signup); // validationSchema => validationRequest => controller
router.post('/login', [login, validateRequest], controller.login);
router.post('/send-code-email', isAuthenticated, controller.sendCodeToEmail);

// router.use('/password', require('./password'));
// router.use('/verify', require('./verify'));
// router.use('/upload', require('./upload'));

module.exports = router;
