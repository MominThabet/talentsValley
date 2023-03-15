const express = require('express');
const { validationResult } = require('express-validator');
const controller = require('../../../controller/recipient');
const { recipient } = require('../../../validationSchema/recipient');

const router = express.Router();
router.get('/', controller.getAllRecipient); //get all with pagination and filters if needed
router.get('/?id'); //get with details
router.delete('/', controller.deleteRecipient); //delete

router.post('/', [recipient, validationResult], controller.addRecipient); //add
router.put('/', [recipient, validationResult], controller.editRecipient); //edit

router.post(
  '/addSendCode',
  [recipient, validationResult],
  controller.sendCodeAdd
); // validate + check if user the
router.post(
  '/editSendCode',
  [recipient, validationResult],
  controller.sendCodeEdit
); // validate + check if user the

module.exports = router;
