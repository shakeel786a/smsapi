const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true,
  },
  stateId: {
    type: String,
    required: false,
    default: "",
  },
  isActive: {
    type: String,
    default: "0",
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

module.exports = mongoose.model("City", citySchema);
