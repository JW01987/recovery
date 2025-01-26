const mongoose = require("mongoose");
const {
  Types: { ObjectId },
} = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  postId: {
    type: ObjectId,
    required: true,
    ref: "Post",
  },
  userId: {
    type: ObjectId,
    require: true,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: new Date(Date.now()),
  },
});

module.exports = mongoose.model("Comment", commentSchema);
