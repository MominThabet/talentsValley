const { validationResult } = require('express-validator');

const {
  UnprocessableEntity,
  InternalServerError,
} = require('./responses/error/errors');

module.exports.validateRequest = async (req, res, next) => {
  try {
    const results = await validationResult(req);
    if (results.isEmpty()) {
      return next();
    }
    let errors = results.array().map((err) => {
      if (err.msg === 'Invalid value(s)') {
        return {
          key: err.param,
          message: err.nestedErrors,
          handler_type: 'message',
        };
      }
      return {
        key: err.param,
        message: err.msg,
        handler_type: 'message',
      };
    });
    if (errors.length === 1) {
      [errors] = errors;
    }

    return next(new UnprocessableEntity(errors));
  } catch (e) {
    console.log(e);
    return next(new InternalServerError(req));
  }
};
