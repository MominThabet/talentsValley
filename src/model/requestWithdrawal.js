const mongoose = require('mongoose');
const request = new mongoose.Schema(
  {
    withdrawalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'withdrawals',
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('requestWithdrawal', request);
