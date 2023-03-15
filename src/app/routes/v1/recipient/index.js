const express = require('express');
const { validateRequest } = require('../../../../utils/validation');
const controller = require('../../../controller/recipient');
const { recipient } = require('../../../validationSchema/recipient');

const router = express.Router();

router.get('/', controller.getAllRecipient); //get all with pagination and filters if needed
router.get('/:id', controller.getRecipient); //get with details
router.delete('/:id', controller.deleteRecipient); //delete

router.post('/', [recipient, validateRequest], controller.addRecipient); //add
router.put('/', [recipient, validateRequest], controller.editRecipient); //edit

router.post(
  '/addSendCode',
  [recipient, validateRequest],
  controller.sendCodeAdd
); // validate + check if user the
router.post(
  '/editSendCode',
  [recipient, validateRequest],
  controller.sendCodeEdit
); // validate + check if user the

module.exports = router;
