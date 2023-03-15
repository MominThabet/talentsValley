const {
  getAllWithdraws,
  getWithdraw,
  addWithdraw,
  cancelWithdraw,
  getLastWithdraw,
  confirmReceipt,
  report,
} = require('../../service/withdrawal');
const { Ok } = require('../../../utils/responses/success/successes');
const {
  BadRequest,
  InternalServerError,
} = require('../../../utils/responses/error/errors');
module.exports.getAllWithdraws = async (req, res, next) => {
  try {
    const { code, message, data } = await getAllWithdraws();
    if (code === 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message, data));
  } catch (error) {
    console.log(error);
    return next(new InternalServerError(error));
  }
};
module.exports.getWithdraw = async (req, res, next) => {
  try {
    const { code, message, data } = await getWithdraw(req.params.id);
    if (code === 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message, data));
  } catch (error) {
    console.log(error);
    return next(new InternalServerError(error));
  }
};
module.exports.addWithdraw = async (req, res, next) => {
  try {
    const { code, message, data } = await addWithdraw(req.body, req.user);
    if (code === 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message, data));
  } catch (error) {
    console.log(error);
    return next(new InternalServerError(error));
  }
};
module.exports.cancelWithdraw = async (req, res, next) => {
  try {
    const { code, message, data } = await cancelWithdraw();
    if (code === 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message, data));
  } catch (error) {
    console.log(error);
    return next(new InternalServerError(error));
  }
};
module.exports.getLastWithdraw = async (req, res, next) => {
  try {
    const { code, message, data } = await getLastWithdraw();
    if (code === 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message, data));
  } catch (error) {
    console.log(error);
    return next(new InternalServerError(error));
  }
};
module.exports.confirmReceipt = async (req, res, next) => {
  try {
    const { code, message, data } = await confirmReceipt();
    if (code === 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message, data));
  } catch (error) {
    console.log(error);
    return next(new InternalServerError(error));
  }
};
// module.exports.report = async (req, res, next) => {
//   try {
//     const { code, message, data } = await report();
//     if (code === 0) {
//       return next(new Ok(message, data));
//     }
//     return next(new BadRequest(message, data));
//   } catch (error) {
//     console.log(error);
//     return next(new InternalServerError(error));
//   }
// };
