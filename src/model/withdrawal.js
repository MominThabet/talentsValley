const mongoose = require('mongoose');

const withdraw = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      require: true,
    },
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'bank',
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'recipient',
    },
    office: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'office',
    },
    withdrawMethod: {
      type: String,
      enum: ['Cash', 'Bank'],
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Ready', 'Sent', 'Canceled', 'Completed', 'Paid'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('withdraw', withdraw);
