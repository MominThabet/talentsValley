const { checkSchema } = require('express-validator');
const { exists, isInt, isString } = require('../validationCustomization');

module.exports.verify = checkSchema({
  verificationCode: {
    in: 'body',
    exists,
    isInt,
    optional: false,
  },
});

module.exports.verifyToken = checkSchema({
  refreshToken: {
    in: 'body',
    exists,
    isString,
    optional: false,
  },
});
