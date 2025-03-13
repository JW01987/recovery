import express, { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { CommentsController } from "../controllers/comments.controller";

const router: Router = express.Router();
const commentsController = new CommentsController();

router.get("/comment", commentsController.commentList);

router.patch(
  "/comment/:commentId",
  authMiddleware,
  commentsController.commentUpdate
);

router.delete(
  "/comment/:commentId",
  authMiddleware,
  commentsController.commentDelete
);

router.post("/comment", authMiddleware, commentsController.commentCreate);

export default router;
