const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    mobile: {
      type: String,
    },
    address: {
      country: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      address1: {
        type: String,
        trim: true,
      },
      address2: {
        type: String,
        trim: true,
      },
    },
    type: {
      type: String,
      enum: ['company', 'individual'],
    },
    verifiedAddress: {
      status: {
        type: String,
        default: 'approved',
        enum: ['not_uploaded', 'pending', 'approved', 'rejected'],
      },
      addressDocumentType: {
        type: String,
        enum: [
          'water_bill',
          'phone_bill',
          'bank_statement',
          'electricity_bill',
          'other',
        ],
      },
      addressFile: {
        type: String,
        trim: true,
      },
      otherDocumentType: {
        type: String,
        trim: true,
      },
      disapproveReason: {
        reason: { type: String },
        note: { type: String },
      },
    },
    verifiedId: {
      status: {
        type: String,
        default: 'approved',
        enum: ['not_uploaded', 'pending', 'approved', 'rejected'],
      },
      idDocumentType: {
        type: String,
        enum: ['passport', 'driving_license', 'national_id'],
      },
      idNumber: {
        type: String,
        trim: true,
      },
      idFile: {
        type: String,
        trim: true,
      },
      disapproveReason: {
        reason: { type: String },
        note: { type: String },
      },
    },
    verifiedEmail: {
      type: Boolean,
      default: true,
    },
    verifiedMobile: {
      type: Boolean,
      default: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    role: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const user = mongoose.model('user', userSchema);
module.exports = user;
