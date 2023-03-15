const { verifyAccessToken } = require('../../jwt');
const { AccessDenied, Unauthorized } = require('../../responses/error/errors');
const User = require('../../../model/user');

async function isAuthenticated(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return next(new Unauthorized('Unauthorized'));
  }
  if (!authorization.startsWith('Bearer')) {
    return next(new Unauthorized('Unauthorized'));
  }

  const split = authorization.split('Bearer ');
  if (split.length !== 2) {
    return next(new Unauthorized('Unauthorized'));
  }
  const token = split[1];

  try {
    const decodedToken = verifyAccessToken(token);

    if (!decodedToken) {
      return next(new Unauthorized('Unauthorized'));
    }

    const user = await User.findOne({ _id: decodedToken.data.id });
    console.log('decodedToken', decodedToken);
    console.log('decodedToken.data', decodedToken.data);
    if (!user) {
      return next(new Unauthorized('Unauthorized'));
    }

    if (user.isDeleted) {
      return next(new AccessDenied('Deleted Account'));
    }
    if (user.isBlocked) {
      return next(new AccessDenied('Blocked Account'));
    }
    req.user = user;
    return next();
  } catch (err) {
    console.log(err);
    return next(new Unauthorized('Unauthorized'));
  }
}

async function isTeamAuth(req, res, next) {
  if (req.user.role == 1) {
    return next();
  }
  return next(new Unauthorized('not A team member'));
}

async function isAuthVerified(req, res, next) {
  if (req.user.verifiedEmail && req.user.verifiedMobile) {
    return next();
  }
  return next(new Unauthorized('email or mobile not verified'));
}
async function isAddressApproved(req, res, next) {
  if (req.user.verifiedAddress.status === 'approved') {
    return next();
  }
  return next(new Unauthorized('address not verified'));
}

module.exports = {
  isAuthenticated,
  isTeamAuth,
  isAuthVerified,
  isAddressApproved,
};
