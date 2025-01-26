const mongoose = require("mongoose");
const {
  Types: { ObjectId },
} = mongoose.Schema;

const postSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    require: true,
  },
  createdAt: {
    type: String,
    default: new Date(Date.now()),
  },
});

module.exports = mongoose.model("Post", postSchema);
