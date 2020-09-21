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
  }
});

module.exports = User = mongoose.model("leaves", UserSchema);