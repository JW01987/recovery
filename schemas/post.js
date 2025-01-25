const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postId: {
    type: Number,
    required: true,
    unique: true,
  },
  writerName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: new Date(Date.now()),
  },
  password: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
