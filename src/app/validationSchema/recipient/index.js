const { checkSchema } = require('express-validator');
const { exists, isInt, isString } = require('../validationCustomization');
module.exports.recipient = checkSchema({
  name: {
    in: 'body',
    exists,
    isString,
    optional: false,
  },
  phone: {
    in: 'body',
    exists,
    isString,
    optional: false,
    custom: {
      options: (val) => {
        const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
        return regex.test(val);
      },
      errorMessage: () => 'wrongMobileFormat',
    },
  },
  recipientId: {
    exists,
    isInt,
    optional: false,
    custom: {
      options: (val) => {
        return 10 ** 8 < val && val < 10 ** 9;
      },
    },
  },
});
