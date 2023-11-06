const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: false,
    },
    content: {
      type: String,
    },
    author: {
      type: String,
    },
    password: {
      type: Number,
      minlength: 4,
      required: true,
    },
    status: {
      type: String,
      default: "FOR_SALE",
      enum: ["FOR_SALE", "SOLD_OUT"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", productsSchema);
