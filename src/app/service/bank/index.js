const Bank = require('../../../model/bank');
const Verification = require('../../../model/verification');
const {
  sendVerificationCodeEmail,
} = require('../../../utils/notification/email');

module.exports.addBank = async (data, user) => {
  try {
    const {
      verificationCode,
      bankAccountOwner,
      branch,
      accountNumber,
      ledger,
    } = data;
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
    const isBank = await Bank.findOne({
      userId: user._id,
      accountNumber,
      isDeleted: false,
    });
    if (isBank) {
      return { code: 1, message: 'Bank already exists', data: null };
    }
    const bank = await Bank.create({
      userId: user._id,
      bankAccountOwner,
      branch,
      accountNumber,
      currency,
      ledger,
    });
    return {
      code: 0,
      message: 'bank added successfully',
      data: { userId: user._id, bank },
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports.editBank = async (id, data, user) => {
  try {
    const {
      verificationCode,
      bankAccountOwner,
      branch,
      accountNumber,
      ledger,
    } = data;
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
    const bank = await Bank.findOne({
      userId: user._id,
      accountNumber,
      isDeleted: false,
    });
    if (!bank) {
      return { code: 1, message: "bank doesn't exists", data: null };
    }
    bank.bankAccountOwner = bankAccountOwner;
    bank.branch = branch;
    bank.accountNumber = accountNumber;
    bank.ledger = ledger;
    await bank.save();
    return { code: 0, message: 'bank updated', data: { bank } };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports.deleteBank = async (id, user) => {
  try {
    const bank = await Bank.findOne({
      userId: user._id,
      _id: id,
      isDeleted: false,
    });
    if (!bank) {
      return { code: 1, message: "bank Doesn't exist", data: null };
    }
    bank.isDeleted = true;
    await bank.save();
    return { code: 0, message: 'bank deleted', data: null };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.getAllBank = async (user) => {
  try {
    const banks = await Bank.find({
      userId: user._id,
      isDeleted: false,
    });
    if (banks.length == 0) {
      return { code: 1, message: 'no banks', data: null };
    }
    return { code: 0, message: 'all banks', data: banks };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports.getBank = async (id) => {
  try {
    const bank = await Bank.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!bank) {
      return { code: 1, message: "bank dosen't exist", data: null };
    }
    return {
      code: 0,
      message: 'success',
      data: { bank },
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.sendCode = async (data, user) => {
  try {
    const { accountNumber } = data;
    const isBank = await Bank.findOne({
      userId: user._id,
      accountNumber,
      isDeleted: false,
    });
    if (isBank) {
      return { code: 1, message: 'bank already exists', data: null };
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
    const { accountNumber } = data;
    const isBank = await Bank.findOne({
      userId: user._id,
      _id: id,
      isDeleted: false,
    });
    if (!isBank) {
      return { code: 1, message: "bank doesn't Exist", data: null };
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
