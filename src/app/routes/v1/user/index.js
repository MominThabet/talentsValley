const express = require('express');
const {
  Created,
  Ok,
} = require('../../../../utils/responses/success/successes');
const { signup } = require('../../../validationSchema/user');
const controller = require('../../../controller/user');

const { validateRequest } = require('../../../../utils/validation');
const router = express.Router();

router.post('/signup', [signup, validateRequest], controller.signup); // validationSchema => validationRequest => controller
router.post('/login', (req, res, next) => {
  next(new Ok('user Logged in', 'token?'));
});
// router.use('/password', require('./password'));
// router.use('/verify', require('./verify'));
// router.use('/upload', require('./upload'));

module.exports = router;
