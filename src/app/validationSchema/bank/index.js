const { checkSchema } = require('express-validator');
const { exists, isString } = require('../validationCustomization');
// TODO: I believe this need to be modified
module.exports.bank = checkSchema({
  bankAccountOwner: {
    in: 'body',
    exists,
    isString,
    optional: false,
  },
  branch: {
    in: 'body',
    exists,
    isString,
    optional: false,
  },
  accountNumber: {
    in: 'body',
    exists,
    isString,
    optional: false,
  },
  ledger: {
    in: 'body',
    exists,
    isString,
    optional: false,
  },
});
