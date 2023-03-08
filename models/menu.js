const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
    required: [true, "Title must be provided"],
  },
  icon: {
    type: String,
    default: "",
  },
  isActive: {
    type: Number,
    default: 1,
  },
  order: {
    type: Number,
    default: 0,
  },
  pageRedirection: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Menu", menuSchema);
