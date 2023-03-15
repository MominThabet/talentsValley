const {
  InternalServerError,
  BadRequest,
} = require('../../../utils/responses/error/errors');
const { Ok, Created } = require('../../../utils/responses/success/successes');
const {
  getAllBank,
  addBank,
  editBank,
  deleteBank,
  sendCode,
  getBank,
  sendCodeEdit,
} = require('../../service/bank');

module.exports.getAllBank = async (req, res, next) => {
  try {
    const { code, message, data } = await getAllBank(req.user);
    if (code === 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message, data));
  } catch (error) {
    console.log(error);
    return next(new InternalServerError(error));
  }
};

module.exports.getBank = async (req, res, next) => {
  try {
    const BankId = req.params.id;
    const { code, message, data } = await getBank(BankId);
    if (code === 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message, data));
  } catch (error) {
    console.log(error);
    return next(new InternalServerError(error));
  }
};

module.exports.addBank = async (req, res, next) => {
  try {
    const { code, message, data } = await addBank(req.body, req.user);
    if (code === 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message, data));
  } catch (error) {
    console.log(error);
    return next(new InternalServerError(error));
  }
};

module.exports.editBank = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { code, message, data } = await editBank(id, req.body, req.user);
    if (code === 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message, data));
  } catch (error) {
    console.log(error);
    return next(new InternalServerError(error));
  }
};

module.exports.deleteBank = async (req, res, next) => {
  try {
    const { code, message, data } = await deleteBank(req.params.id, req.user);
    if (code === 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message, data));
  } catch (error) {
    console.log(error);
    return next(new InternalServerError(error));
  }
};

module.exports.sendCodeAdd = async (req, res, next) => {
  try {
    const { code, message, data } = await sendCode(req.body, req.user);
    if (code === 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message, data));
  } catch (error) {
    console.log(error);
    return next(new InternalServerError(error));
  }
};

module.exports.sendCodeEdit = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { code, message, data } = await sendCodeEdit(id, req.body, req.user);
    if (code === 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message, data));
  } catch (error) {
    console.log(error);
    return next(new InternalServerError(error));
  }
};
