const { checkSchema } = require('express-validator');
const { exists, isInt, isString } = require('../validationCustomization');
module.exports.withdrawal = checkSchema({
  amount: {
    in: 'body',
    exists,
    optional: false,
  },
});
