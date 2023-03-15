const { checkSchema } = require('express-validator');

module.exports.recipient = checkSchema({
  name: {},
  phone: {},
  recipientId: {},
});
