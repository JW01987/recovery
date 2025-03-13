import express, { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { LikesController } from "../controllers/likes.controller";

const likesController = new LikesController();
const router: Router = express.Router();

router.post("/like/:postId", authMiddleware, likesController.like);
router.get("/like", authMiddleware, likesController.likeGet);

export default router;
