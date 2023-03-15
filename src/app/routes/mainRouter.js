const express = require('express');
const {
  isAuthenticated,
  isTeamAuth,
  isAddressApproved,
  isAuthVerified,
} = require('../../utils/middleware/auth/auth');

const router = express.Router();

router.use('/user', require('./v1/user/index'));

// TODO: ADD AUTHORIZATION BEFORE THE NEXT
router.use(isAuthenticated, isAuthVerified, isAddressApproved);

router.use('/office', require('./v1/office'));
router.use('/recipient', require('./v1/recipient'));
router.use('/bank', require('./v1/bank'));
module.exports = router;
