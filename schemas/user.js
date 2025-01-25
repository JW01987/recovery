const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  createdAt: {
    type: String,
    default: new Date(Date.now()),
  },
});

module.exports = mongoose.model("User", userSchema);
