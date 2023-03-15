const mongoose = require('mongoose');

const bank = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  bankName: {
    type: String,
    default: 'Bank of Palestine',
  },
  bankAccountOwner: {
    type: String,
  },
  branch: {
    type: String,
  },
  accountNumber: {
    type: Number,
  },
  currency: {
    type: String,
    default: 'USD (001)',
  },
  ledger: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('bank', bank);
