const express = require('express');
const {
  isAuthenticated,
  isAddressApproved,
  isAuthVerified,
  isTeamAuth,
} = require('../../../../utils/middleware/auth/auth');
// const { validationResult } = require('express-validator');
const controller = require('../../../controller/office');
// const { addOffice } = require('../../../validationSchema/office');

const router = express.Router();

router.get('/', controller.getAllOffices);
router.use(isTeamAuth);
router.post('/', isTeamAuth, controller.addOffice);
// TODO: add edit & delete for team users on office no needed now

module.exports = router;
