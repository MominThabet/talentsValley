const {
  InternalServerError,
  BadRequest,
  NotFound,
} = require('../../../utils/responses/error/errors');
const { Ok } = require('../../../utils/responses/success/successes');
const {
  verifyEmail,
  verifyRefreshToken,
} = require('../../service/user/verify');
module.exports.verifyEmail = async (req, res, next) => {
  const { verificationCode } = req.body;
  const { _id } = req.user._id;
  try {
    const { message, data, code } = await verifyEmail({
      verificationCode,
      _id,
    });
    if (code == 0) {
      return next(new Ok(message, data));
    }
    if (code == 1) {
      return next(new NotFound(message));
    }
    return next(new BadRequest(message));
  } catch (err) {
    console.log(err);
    return next(new InternalServerError(err));
  }
};
module.exports.verifyRefreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;
  try {
    const { message, data, code } = await verifyRefreshToken({
      refreshToken,
    });
    if (code === 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message));
  } catch (err) {
    console.log(err);
    return next(new InternalServerError(req));
  }
};
