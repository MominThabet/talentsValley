const express = require('express');

const router = express.Router();

router.use('/user', require('./v1/user/index'));

// TODO: ADD AUTHORIZATION BEFORE THE NEXT
router.use('/office', require('./v1/office'));
router.use('/recipient', require('./v1/recipient'));

module.exports = router;
