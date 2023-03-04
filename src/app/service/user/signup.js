const bcrypt = require('bcrypt');
const User = require('../../../model/user');
const jwt = require('../../../utils/jwt');
require('dotenv').config();
module.exports.signup = async (data) => {
  try {
    const { firstName, lastName, email, country, password, mobile } = data;
    const SALT = parseInt(process.env.SALT);
    const isUsedEmail = await User.findOne({ email, isDeleted: false });
    if (isUsedEmail) {
      return { code: 2, message: 'UsedEmail', data: null };
    }
    const isUsedMobile = await User.findOne({ mobile, isDeleted: false });
    if (isUsedMobile) {
      return { code: 2, message: 'UsedMobile', data: null };
    }
    const salt = await bcrypt.genSalt(SALT);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      address: { country },
      password: hashedPassword,
      mobile,
    });
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
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
