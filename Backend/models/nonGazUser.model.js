const mongoose = require("mongoose");

const nonGazUserSchema = new mongoose.Schema({
  empName: {
    type: String,
    required: true,
  },
  desg: {
    type: String,
    required: true,
  },
  empNo: {
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
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
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
    type: String,
    required: true,
  },

  profilePic: {
    data: Buffer,
    contentType: String,
  },
  signPic: {
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
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  }
});

module.exports = mongoose.model("NonGazUser", nonGazUserSchema);
