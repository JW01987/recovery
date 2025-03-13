import { Response, NextFunction } from "express";
import { AuthRequest } from "../utils/authRequest";
import { PostService } from "../services/posts.service";

export class PostsController {
  postService = new PostService();

  getPostAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const posts = await this.postService.getPostAll();
      res.status(200).json({ data: posts });
    } catch (error) {
      console.error("[Controller] 게시글 조회 실패:", error);
      next(error);
    }
  };

  getPosts = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const userId: number = Number(req.user.id);
      const userPost = await this.postService.getPosts({ userId });
      res.status(200).json({ data: userPost });
    } catch (error) {
      console.error("[Controller] 게시글 조회 실패:", error);
      next(error);
    }
  };

  updatePost = async (req: AuthRequest, res: Response, next: NextFunction) => {
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
      return res.status(200).json({ message: "게시글 수정성공" });
    } catch (error) {
      console.error("[Controller] 게시글 수정 실패:", error);
      next(error);
    }
  };
  deletePost = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const postId = Number(req.params.postId);
      const userId = req.user.id;

      await this.postService.deletePost({ postId, userId });
      return res.status(200).json({ message: "게시글 삭제 성공" });
    } catch (error) {
      console.error("[Controller] 게시글 삭제 실패:", error);
      next(error);
    }
  };
  createPost = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const { title, content } = req.body;
      const userId = req.user.id;

      await this.postService.createPost({
        title,
        content,
        userId,
      });

      return res.status(200).json({ message: "게시글 등록 성공" });
    } catch (error) {
      console.error("[Controller] 게시글 등록 실패:", error);
      next(error);
    }
  };
}

module.exports = PostsController;
