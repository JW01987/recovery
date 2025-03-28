import { Response, NextFunction } from "express";
import { AuthRequest } from "../utils/authRequest";
import { PostService } from "../services/posts.service";
import { CreatePostDto, UpdatePostDto } from "../utils/dtos/postDto";
import { Posts } from "@prisma/client";

export class PostsController {
  postService = new PostService();

  getPostAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const posts = await this.postService.getPostAll();
      res.status(200).json({ posts });
    } catch (error) {
      console.error("[Controller] 게시글 조회 실패");
      next(error);
    }
  };

  getPosts = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const userId = req.user.id;
      const posts = await this.postService.getPosts({ userId });
      res.status(200).json({ posts });
    } catch (error) {
      console.error("[Controller] 게시글 조회 실패");
      next(error);
    }
  };

  updatePost = async (
    req: AuthRequest<{ postId: string }, {}, UpdatePostDto>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const userId = req.user.id;
      const { title, content } = req.body;
      const postId = Number(req.params.postId);

      await this.postService.updatePost({
        userId,
        title,
        content,
        postId,
      });
      res.status(200).json({ message: "게시글 수정성공" });
    } catch (error) {
      console.error("[Controller] 게시글 수정 실패");
      next(error);
    }
  };
  deletePost = async (
    req: AuthRequest<{ postId: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const postId = Number(req.params.postId);
      const userId = req.user.id;

      await this.postService.deletePost({ postId, userId });
      res.status(200).json({ message: "게시글 삭제 성공" });
    } catch (error) {
      console.error("[Controller] 게시글 삭제 실패");
      next(error);
    }
  };
  createPost = async (
    req: AuthRequest<{}, {}, CreatePostDto>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const { title, content } = req.body;
      const userId = req.user.id;

      const result: Posts = await this.postService.createPost({
        title,
        content,
        userId,
      });

      res.status(200).json({ message: "게시글 등록 성공", postId: result.id });
    } catch (error) {
      console.error("[Controller] 게시글 등록 실패");
      next(error);
    }
  };
}
