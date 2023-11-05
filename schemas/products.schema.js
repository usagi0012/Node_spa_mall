const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
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
    required: true,
  },
});

module.exports = mongoose.model("Products", productsSchema);
