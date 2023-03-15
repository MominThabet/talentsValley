const mongoose = require('mongoose');

const withdraw = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      require: true,
    },
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'banks',
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'recipients',
    },
    office: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'offices',
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
