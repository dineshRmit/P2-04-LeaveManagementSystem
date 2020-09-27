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
    required: true,
  },
  carersLeave: {
    type: Number,
    default: 10,
    required: true,
  },
  bloodDonorLeave: {
    type: Number,
    default: 10,
    required: true,
  },
  sickLeaveWC: {
    type: Number,
    default: 10,
    required: true,
  },
  sickLeaveWOC: {
    type: Number,
    default: 10,
    required: true,
  },
  parentalLeave: {
    type: Number,
    default: 10,
    required: true,
  },
  unpaidLeave: {
    type: Number,
    default: 10,
    required: true,
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
