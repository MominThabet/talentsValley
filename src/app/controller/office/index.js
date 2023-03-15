const {
  InternalServerError,
  BadRequest,
} = require('../../../utils/responses/error/errors');
const { Ok } = require('../../../utils/responses/success/successes');
const { addOffice, getAllOffices } = require('../../service/office');

module.exports.addOffice = async function (req, res, next) {
  try {
    const { code, message, data } = await addOffice(req.body);
    if (code === 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message, data));
  } catch (error) {
    console.log(error);
    return next(new InternalServerError(error));
  }
};
module.exports.getAllOffices = async function (req, res, next) {
  try {
    const { code, message, data } = await getAllOffices();
    if (code === 0) {
      return next(new Ok(message, data));
    }
    return next(new BadRequest(message, data));
  } catch (error) {
    console.log(error);
    return next(new InternalServerError(error));
  }
};
