const { checkSchema } = require('express-validator');
const { exists, isString } = require('../validationCustomization');

module.exports.addOffice = checkSchema({});
