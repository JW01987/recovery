const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const CommentsController = require("../controllers/comments.controller");
const commentsController = new CommentsController();

module.exports = router;
