const {
  InternalServerError,
  BadRequest,
} = require('../../../utils/responses/error/errors');
const { Ok, Created } = require('../../../utils/responses/success/successes');
const {
  getAllRecipient,
  addRecipient,
  editRecipient,
  deleteRecipient,
  sendCode,
  getRecipient,
  sendCodeEdit,
} = require('../../service/recipient');

module.exports.getAllRecipient = async (req, res, next) => {
  try {
    const { code, message, data } = await getAllRecipient();
    if (code === 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message, data));
  } catch (error) {
    console.log(error);
    return next(new InternalServerError(error));
  }
};

module.exports.getRecipient = async (req, res, next) => {
  try {
    const recipientId = req.params.id;
    const { code, message, data } = await getRecipient(recipientId);
    if (code === 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message, data));
  } catch (error) {
    console.log(error);
    return next(new InternalServerError(error));
  }
};

module.exports.addRecipient = async (req, res, next) => {
  try {
    const { code, message, data } = await addRecipient(req.body, req.user);
    if (code === 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message, data));
  } catch (error) {
    console.log(error);
    return next(new InternalServerError(error));
  }
};

module.exports.editRecipient = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { code, message, data } = await editRecipient(id, req.body, req.user);
    if (code === 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message, data));
  } catch (error) {
    console.log(error);
    return next(new InternalServerError(error));
  }
};

module.exports.deleteRecipient = async (req, res, next) => {
  try {
    const { code, message, data } = await deleteRecipient();
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
