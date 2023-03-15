const mongoose = require('mongoose');
const request = new mongoose.Schema(
  {
    withdrawalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'withdrawals',
    },
    action: {
      type: String,
      enum: ['send', 'cancel'],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('requestWithdrawal', request);
