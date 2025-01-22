const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentId: {
    type: Number,
    required: true,
    unique: true,
  },
  postId: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: String,
    default: new Date(Date.now()),
  },
  content: {
    type: String,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
