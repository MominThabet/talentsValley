const Recipient = require('../../../model/recipient');
const Verification = require('../../../model/verification');
const {
  sendVerificationCodeEmail,
} = require('../../../utils/notification/email');

module.exports.addRecipient = async (data, user) => {
  try {
    const { verificationCode, name, phone, recipientId } = data;
    let verification = await Verification.findOne({
      userId: user._id,
      email: user.email,
    });

    if (!verification) {
      return { code: 2, message: 'No verifiy Code', data: null };
    }

    if (verificationCode != verification.verificationCode) {
      return { code: 2, message: 'Wrong Verification Code', data: null };
    }
    const isRecipient = await Recipient.findOne({
      recipientId,
      isDeleted: false,
    });
    if (isRecipient) {
      return { code: 1, message: 'recipient already exists', data: null };
    }
    const recipient = await Recipient.create({
      userId: user._id,
      name,
      phone,
      recipientId,
    });
    return {
      code: 0,
      message: 'recipient added successfully',
      data: { userId: user._id, recipient },
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports.editRecipient = async (data) => {};
module.exports.deleteRecipient = async (data) => {};

module.exports.getAllRecipient = async (data) => {};
module.exports.getRecipient = async (data) => {};

module.exports.sendCode = async (data, user) => {
  try {
    const { name, phone, recipientId } = data;
    const isRecipient = await Recipient.findOne({
      recipientId,
      isDeleted: false,
    });
    if (isRecipient) {
      return { code: 1, message: 'recipient already exists', data: null };
    }

    let verification = await Verification.findOne({
      userId: user._id,
      email: user.email,
    });

    if (!verification) {
      verification = new Verification({ userId: user._id, email: user.email });
      verification = await verification.save();
    }
    verification.verificationCode = '123456';
    await verification.save();

    await sendVerificationCodeEmail(user.email, '123456');
    return {
      code: 0,
      message: 'verification code sent',
      data: { userId: user._id, email: user.email },
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
