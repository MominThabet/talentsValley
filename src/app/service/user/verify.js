const User = require('../../../model/user');
const Verification = require('../../../model/verification');

module.exports.verifyEmail = async (data) => {
  const { verificationCode, _id } = data;
  try {
    const user = await User.findOne({ _id, isDeleted: false });
    if (!user) {
      return { code: 1, message: 'userNotFound', data: null };
    }
    const verifyUserEmail = await Verification.findOne({
      userId: _id,
      email: user.email,
      verificationCode,
    });
    if (!verifyUserEmail) {
      return { code: 2, message: 'InvalidCode', data: null };
    }
    await verifyUserEmail.remove();

    user.verifiedEmail = true;
    await user.save();

    return {
      code: 0,
      message: 'verified',
    };
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

module.exports.verifyRefreshToken = async () => {};
