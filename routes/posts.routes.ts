import express, { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import PostsController from "../controllers/posts.controller";

const postsController = new PostsController();
const router: Router = express.Router();

router.get("/postall", postsController.getPostAll);
router.get("/post", authMiddleware, postsController.getPosts);
router.patch("/post/:postId", authMiddleware, postsController.updatePost);
router.delete("/post/:postId", authMiddleware, postsController.deletePost);
router.post("/post", authMiddleware, postsController.createPost);

export default router;
