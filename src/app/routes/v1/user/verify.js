const express = require('express');

const { validateRequest } = require('../../../../utils/validation');
const {
  verify,
  verifyToken,
} = require('../../../validationSchema/user/verify');
const { isAuthenticated } = require('../../../../utils/middleware/auth/auth');
const controller = require('../../../controller/user/verify');

const router = express.Router();

router.post(
  '/email',
  isAuthenticated,
  [verify, validateRequest],
  controller.verifyEmail
);
// router.post(
//   '/refresh-token',
//   [verifyToken, validateRequest],
//   controller.verifyRefreshToken
// );

module.exports = router;
