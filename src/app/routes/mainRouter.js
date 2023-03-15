const express = require('express');

const router = express.Router();

router.use('/user', require('./v1/user/index'));
router.use('/office', require('./v1/office'));
module.exports = router;
