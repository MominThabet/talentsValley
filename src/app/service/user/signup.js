const bcrypt = require('bcrypt');
const User = require('../../../model/user');
const Verification = require('../../../model/verification');
const jwt = require('../../../utils/jwt');
const {
  sendVerificationCodeEmail,
} = require('../../../utils/notification/email');
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

module.exports.sendCodeToEmail = async (data) => {
  const { _id } = data;
  try {
    const user = await User.findOne({ _id, isDeleted: false });
    if (!user) {
      return { code: 1, message: 'user.notFoundUser', data: null };
    }

    const code = Math.floor(Math.random() * 10 ** 7);

    let verification = await Verification.findOne({
      userId: _id,
      email: user.email,
    });

    if (!verification) {
      verification = new Verification({ userId: _id, email: user.email });
      verification = await verification.save();
    }
    verification.verificationCode = code;
    await verification.save();

    sendVerificationCodeEmail(user.email, code);

    return {
      code: 0,
      message: 'commonSuccess.message',
      data: { _id, email: user.email },
    };
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
