const Office = require('../../../model/office');
const Bank = require('../../../model/bank');
const Recipient = require('../../../model/recipient');
const Withdrawal = require('../../../model/withdrawal');
const requestWithdrawal = require('../../../model/requestWithdrawal');
module.exports.getAllWithdraws = async (data) => {
  try {
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports.getWithdraw = async (id) => {
  try {
    const withdraw = await Withdrawal.findOne({
      _id: id,
    });
    if (!withdraw) {
      return { code: 1, message: "witdraw dosen't exist", data: null };
    }
    return { code: 0, message: 'Success', data: { withdraw } };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports.addWithdraw = async (data, user) => {
  try {
    const { withdrawMethod } = data;
    if (withdrawMethod == 'Cash') {
      const { amount, officeId, recipientId } = data;

      const office = await Office.findOne({
        _id: officeId,
        isDeleted: false,
      });
      if (!office) {
        return { code: 1, message: "office doesn't exist", data: null };
      }

      const recipient = await Recipient.findOne({
        _id: recipientId,
        isDeleted: false,
      });
      if (!recipient) {
        return { code: 1, message: "recipient doesn't exist", data: null };
      }

      if (amount % 1 !== 0) {
        return { code: 1, message: 'amount should be integer', data: null };
      }

      const withdrawal = await Withdrawal.create({
        userId: user._id,
        amount,
        recipient: recipient._id,
        office: office._id,
        withdrawMethod: 'Cash',
      });
      await requestWithdrawal.create({
        withdrawalId: withdrawal._id,
        action: 'send',
      });
      return {
        code: 0,
        message: 'Withdrawal sent to team',
        data: { withdrawal },
      };
    } else if (withdrawMethod == 'Bank') {
      const { amount, bankId } = data;
      const bank = await Bank.findOne({
        _id: bankId,
        isDeleted: false,
      });
      if (!bank) {
        return { code: 1, message: "bank doesn't exist", data: null };
      }
      const withdrawal = await Withdrawal.create({
        userId: user._id,
        amount,
        bank: bank._id,
        withdrawMethod: 'Bank',
      });
      await requestWithdrawal.create({
        withdrawalId: withdrawal._id,
      });
      return {
        code: 0,
        message: 'withdrawal send for team',
        data: { withdrawal },
      };
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports.cancelWithdraw = async (user, withdrawId) => {
  try {
    const withdraw = await Withdrawal.findOne({
      _id: withdrawId,
      userId: user._id,
    });

    if (!withdraw) {
      return { code: 1, message: 'no withdraw', data: null };
    }

    if (withdraw.status === 'Sent' || withdraw.status === 'Completed') {
      return { code: 2, message: "can't cancel withdraw", data: null };
    }
    await requestWithdrawal.create({
      withdrawalId: withdraw._id,
      action: 'cancel',
    });
    return { code: 0, message: 'send cancel request', data: null };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports.getLastWithdraw = async (user) => {
  try {
    const lastWithdraw = await Withdrawal.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(1);
    if (!lastWithdraw) {
      return { code: 1, message: 'no past withdawals', data: null };
    }
    return { code: 0, message: 'last Withdrawal', data: { lastWithdraw } };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports.confirmWithdrawal = async (user, withdrawId) => {
  try {
    const withdraw = await Withdrawal.findOne({
      _id: withdrawId,
      userId: user._id,
    });
    if (!withdraw) {
      return { code: 1, message: 'not found', data: null };
    }
    if (withdraw.status === 'Completed') {
      return { code: 2, message: 'withdraw Completed', data: null };
    }
    if (withdraw.status !== 'Ready' || withdraw.status !== 'Sent') {
      return { code: 2, message: 'not Ready withdraw' };
    }
    withdraw.status = 'Completed';
    await withdraw.save();
    return { code: 0, message: 'success withdraw completed', data: null };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// module.exports.report = async (data) => {
//   try {
//   } catch (error) {
//     console.log(error);
//     throw new Error(error);
//   }
// };
