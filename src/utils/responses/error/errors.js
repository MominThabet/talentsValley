const { GeneralError } = require('./generalError');
const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} = require('../../httpCodes');

class BadRequest extends GeneralError {
  constructor(message, data = undefined) {
    super(BAD_REQUEST, message, data);
  }
}

class InternalServerError extends GeneralError {
  constructor(message, data = undefined) {
    super(INTERNAL_SERVER_ERROR, message, data);
  }
}
class Unauthorized extends GeneralError {
  constructor(message, data = undefined) {
    super(UNAUTHORIZED, message, data);
  }
}
/**
 * @type {{
 *  BadRequest:BadRequest,
 *  InternalServerError:InternalServerError,
 *  Unauthorized:Unauthorized,
 *
 * }}
 */
module.exports = {
  BadRequest,
  InternalServerError,
  Unauthorized,
};
