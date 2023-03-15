const mongoose = require('mongoose');
const officeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  workingHours: {
    type: String,
  },
  fees: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
const office = mongoose.model('office', officeSchema);
module.exports = office;
