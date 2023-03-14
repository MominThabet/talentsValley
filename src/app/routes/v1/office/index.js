const express = require('express');
// const { validationResult } = require('express-validator');
const controller = require('../../../controller/office');
// const { addOffice } = require('../../../validationSchema/office');

const router = express.Router();

router.post('/', controller.addOffice);
router.get('/', controller.getAllOffices);
module.exports = router;
