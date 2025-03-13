import { Response, NextFunction } from "express";
import { AuthRequest } from "../utils/authRequest";
import { LikesService } from "../services/likes.service";

export class LikesController {
  likeService = new LikesService();

  like = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const userId = req.user.id;
      const postId = Number(req.params.postId);
      const { like } = await this.likeService.like({ userId, postId });
      if (like) {
        res.status(200).json({ message: "좋아요를 등록했습니다" });
      } else {
        res.status(200).json({ message: "좋아요를 취소했습니다" });
      }
    } catch (error) {
      console.error("[Controller] 좋아요 등록 실패:", error);
      next(error);
    }
  };

  likeGet = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const userId = req.user.id;
      const { result } = await this.likeService.likeGet(userId);
      res.status(200).json({ result });
    } catch (error) {
      console.error("[Controller] 로그인 실패:", error);
      next(error);
    }
  };
}
module.exports = LikesController;
