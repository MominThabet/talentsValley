const mongoose = require('mongoose');

const recipient = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
  },
  recipientIdNum: {
    type: Number,
  },
  phone: {
    type: Number,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('recipient', recipient);
