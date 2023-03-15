const express = require('express');
const { validateRequest } = require('../../../../utils/validation');
const controller = require('../../../controller/bank');
const { bank } = require('../../../validationSchema/bank');

const router = express.Router();

router.get('/', controller.getAllBank);
router.get('/:id', controller.getBank); //get with details
router.delete('/:id', controller.deleteBank); //delete

router.post('/', [bank, validateRequest], controller.addBank); //add
router.put('/:id', [bank, validateRequest], controller.editBank); //edit

router.post('/addSendCode', [bank, validateRequest], controller.sendCodeAdd); // validate + check if user the
router.post(
  '/editSendCode/:id',
  [bank, validateRequest],
  controller.sendCodeEdit
); // validate + check if user the

module.exports = router;
