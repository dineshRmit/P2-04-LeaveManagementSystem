const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LeavesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  fromEmail: {
    type: String,
    required: true,
  },
  toEmail: {
    type: String,
    required: true,
  },
  fromDate: {
    type: date,
    required: true,
  },
  toDate: {
    type: date,
    required: true,
  },
  leaveType: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
});

module.exports = Leaves = mongoose.model("leaves", LeavesSchema);
