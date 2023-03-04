const { Ok } = require('../../../utils/responses/success/successes');

const {
  InternalServerError,
  BadRequest,
  NotFound,
} = require('../../../utils/responses/error/errors');

const { signup, sendCodeToEmail } = require('../../service/user/signup');
const { login } = require('../../service/user/login');

module.exports.signup = async (req, res, next) => {
  try {
    const { message, data, code } = await signup(req.body);
    if (code == 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message));
  } catch (e) {
    console.log(e);
    return next(new InternalServerError(req));
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { message, data, code } = await login(req.body);
    if (code == 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message));
  } catch (e) {
    console.log(e);
    return next(new InternalServerError(req));
  }
};

module.exports.sendCodeToEmail = async (req, res, next) => {
  try {
    const { message, data, code } = await sendCodeToEmail({
      _id: req.user._id,
    });
    if (code === 1) {
      return next(new NotFound(message, data));
    }

    if (code === 0) {
      return next(new Ok(message, data));
    }

    return next(new BadRequest(message));
  } catch (err) {
    console.log(err);
    return next(new InternalServerError(err));
  }
};
