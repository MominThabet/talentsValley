module.exports.isString = {
  errorMessage: () => 'mustBeString',
};

module.exports.exists = {
  options: {
    checkFalsy: true,
  },
  errorMessage: () => 'required',
};

module.exports.isInt = {
  errorMessage: () => 'mustBeInt',
};
