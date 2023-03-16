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
      userId: user._id,
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
module.exports.editRecipient = async (id, data, user) => {
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
    const recipient = await Recipient.findOne({
      userId: user._id,
      _id: id,
      isDeleted: false,
    });
    if (!recipient) {
      return { code: 1, message: "recipient doesn't exists", data: null };
    }
    recipient.name = name;
    recipient.phone = phone;
    recipient.recipientId = recipientId;
    await recipient.save();
    return { code: 0, message: 'recipient updated', data: { recipient } };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports.deleteRecipient = async (id, user) => {
  try {
    const recipient = await Recipient.findOne({
      userId: user._id,
      _id: id,
      isDeleted: false,
    });
    if (!recipient) {
      return { code: 1, message: "recipient Doesn't exist", data: null };
    }
    recipient.isDeleted = true;
    await recipient.save();
    return { code: 0, message: 'recipient deleted', data: null };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.getAllRecipient = async (user) => {
  try {
    const recipients = await Recipient.find({
      userId: user._id,
      isDeleted: false,
    });
    if (recipients.length == 0) {
      return { code: 1, message: 'no recipients', data: null };
    }
    return { code: 0, message: 'all recipients', data: recipients };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports.getRecipient = async (id) => {
  try {
    const recipient = await Recipient.findOne({
      _id: id,
      userId: user._id,
      isDeleted: false,
    });
    if (!recipient) {
      return { code: 1, message: "recipient dosen't exist", data: null };
    }
    return {
      code: 0,
      message: 'success',
      data: { recipient },
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.sendCode = async (data, user) => {
  try {
    const { name, phone, recipientId } = data;
    const isRecipient = await Recipient.findOne({
      userId: user._id,
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

module.exports.sendCodeEdit = async (id, data, user) => {
  try {
    const { name, phone, recipientId } = data;
    const isRecipient = await Recipient.findOne({
      userId: user._id,
      _id: id,
      isDeleted: false,
    });
    if (!isRecipient) {
      return { code: 1, message: "recipient doesn't Exist", data: null };
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
      data: { userId: user._id, email: user.email, id },
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
