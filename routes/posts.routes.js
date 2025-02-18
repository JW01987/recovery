const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

router.get("/postall", postsController.getPostAll);
router.get("/post", authMiddleware, postsController.getPosts);
router.patch("/post/:postId", authMiddleware, postsController.updatePost);
router.delete("/post/:postId", authMiddleware, postsController.deletePost);
router.post("/post", authMiddleware, postsController.createPost);

module.exports = router;
