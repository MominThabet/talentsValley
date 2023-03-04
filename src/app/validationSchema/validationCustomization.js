module.exports.isString = {
  errorMessage: () => 'mustBeString',
};

module.exports.exists = {
  options: {
    checkFalsy: true,
  },
  errorMessage: () => 'required',
};
