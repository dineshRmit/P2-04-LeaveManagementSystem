const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  reportingManager: {
    type: String,
    required: true,
  },
  userType1: {
    type: String,
    required: true,
  },
  userType2: {
    type: String,
    required: true,
  },
  userType3: {
    type: String,
    required: true,
  },
  annualLeave: {
    type: Number,
    default: 10,
  },
  carersLeave: {
    type: Number,
    default: 10,
  },
  bloodDonorLeave: {
    type: Number,
    default: 10,
  },
  sickLeaveWC: {
    type: Number,
    default: 10,
  },
  sickLeaveWOC: {
    type: Number,
    default: 10,
  },
  parentalLeave: {
    type: Number,
    default: 10,
  },
  unpaidLeave: {
    type: Number,
    default: 10,
  },
  isAccountActive: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
