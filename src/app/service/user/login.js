const bcrypt = require('bcrypt');
const User = require('../../../model/user');
const jwt = require('../../../utils/jwt');

module.exports.login = async (data) => {
  try {
    const { email, password } = data;

    const user = await User.findOne({ email, isDeleted: false });
    if (!user) {
      return { code: 2, message: 'IncorrectEmailORPass', data: null };
    }

    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) {
      return { code: 2, message: 'IncorrectEmailORPass', data: null };
    }

    const accessToken = jwt.createAccessToken({
      id: user._id,
      role: user.role,
    });
    const refreshToken = jwt.createRefreshToken({
      id: user._id,
      role: user.role,
    });

    return {
      code: 0,
      message: 'commonSuccess.message',
      data: { accessToken, refreshToken, user },
    };
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
