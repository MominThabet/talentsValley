const { checkSchema } = require('express-validator');
const { exists, isString } = require('../validationCustomization');
module.exports.signup = checkSchema({
  firstName: {
    in: 'body',
    exists,
    isString,
    optional: false,
  },
  lastName: {
    in: 'body',
    exists,
    isString,
    optional: false,
  },
  mobile: {
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
  email: {
    in: 'body',
    exists,
    isString,
    optional: false,
    custom: {
      options: (value) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(value);
      },
      errorMessage: () => 'wrongEmailFormat',
    },
  },
  country: {
    in: 'body',
    isString,
    optional: false,
  },
  password: {
    in: 'body',
    exists,
    isString,
    optional: false,
    custom: {
      options: (value) => {
        const regex =
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        return regex.test(value);
      },
      errorMessage: () => 'passwordIsWeak',
    },
  },
});
