const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.9,
  },
  company: {
    type: String,
    // enum: {
    //   values: ["apple", "samsung", "dell", "lenevo"],
    //   message: `{VALUE} is not supported`,
    // },
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

module.exports = mongoose.model("Product", productSchema);
