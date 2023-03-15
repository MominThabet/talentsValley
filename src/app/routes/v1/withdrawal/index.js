const express = require('express');
const { validateRequest } = require('../../../../utils/validation');
const controller = require('../../../controller/withdrawal');
const { withdrawal } = require('../../../validationSchema/withdrawal');

const router = express.Router();

router.get('/', controller.getAllWithdraws); //with pagination

router.get('/lastreq', controller.getLastWithdraw); //get last req
router.get('/:id', controller.getWithdraw);
router.post('/', [withdrawal, validateRequest], controller.addWithdraw);

router.put('/:id', controller.cancelWithdraw); // cancel depending on status

router.put('/confirmWithdrawal', controller.confirmWithdrawal); // confirm receipt
// router.post('/report', controller.report); //report problem => need mock model

module.exports = router;
