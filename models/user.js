const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: Number, // 0: Male, 1: Female
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  isActive: {
    type: String,
    default: "0",
  },
  religion: {
    type: String,
    required: false,
    default: "",
  },
  email: {
    type: String,
    required: false,
    default: "",
  },
  bloodGroup: {
    type: String,
    required: false,
    default: "",
  },
  profilePic: {
    type: String,
    required: false,
    default: "",
  },
  userRoleId: {
    type: String,
    required: false,
    default: "",
  },
  createdBy: {
    type: String,
    required: false,
    default: "",
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  modifiedBy: {
    type: String,
    required: false,
    default: "",
  },
  modifiedOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
