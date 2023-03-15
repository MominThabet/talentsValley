const express = require('express');
const { validateRequest } = require('../../../../utils/validation');
const controller = require('../../../controller/withdrawal');
const { withdrawal } = require('../../../validationSchema/withdrawal');

const router = express.Router();

router.get('/', controller.getAllWithdraws); //with pagination
router.get('/:id', controller.getWithdraw); //get all details of a specific withdraw
router.post('/', [withdrawal, validateRequest], controller.addWithdraw); // methodType amount method id's status pending and mock sending it to team

router.put('/:id', controller.cancelWithdraw); // cancel depending on status

router.get('/lastReq', controller.getLastWithdraw); //get last req
router.put('/confirmReceipt', controller.confirmReceipt); // confirm receipt
// router.post('/report', controller.report); //report problem => need mock model

module.exports = router;
