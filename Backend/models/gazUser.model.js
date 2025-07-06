const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const gazUserSchema = new mongoose.Schema({
  empName: {
    type: String,
    required: true,
  },
  desg: {
    type: String,
    required: true,
  },
  ruidNo: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
  station: {
    type: String,
    required: true,
  },
  billUnit: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  rlyContact: {
    type: String,
  },
  mobile: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },

  family: [
    {
      name: {
        type: String,
        required: true,
      },
      bloodGrp: {
        type: String,
        required: true,
      },
      relation: {
        type: String,
        required: true,
      },
      famDob: {
        type: Date,
        required: true,
      },
      idMarks: {
        type: String,
        required: true,
      },
    },
  ],
  emergencyName: {
    type: String,
    required: true,
  },
  emergencyContact: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  profilePic: {
    data: Buffer,
    contentType: String,
  },
  signPic: {
    data: Buffer,
    contentType: String,
  },
  hindiNamePic: {
    data: Buffer,
    contentType: String,
  },
  hindiDesg: {
    data: Buffer,
    contentType: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
});

module.exports = mongoose.model("GazUser", gazUserSchema);
