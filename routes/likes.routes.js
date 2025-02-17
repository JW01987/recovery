const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const LikesController = require("../controllers/likes.controller");
const likesController = new LikesController();

router.post("/like/:postId", authMiddleware, likesController.like);
router.get("/like", authMiddleware, likesController.likeGet);

module.exports = router;
