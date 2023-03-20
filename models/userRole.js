const mongoose = require("mongoose");

const userRoleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  isActive: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: String,
    required: false,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  modifiedBy: {
    type: String,
    required: false,
  },
  modifiedOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("UserRole", userRoleSchema);
