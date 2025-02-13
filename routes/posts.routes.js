const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

router.get("/postall", postsController.getPostAll);
router.get("/post", authMiddleware, postsController.getPosts);
router.post("/post/update/:postId", authMiddleware, postsController.updatePost);
router.post("/post/delete/:postId", authMiddleware, postsController.deletePost);
router.post("/post", authMiddleware, postsController.createPost);

module.exports = router;
