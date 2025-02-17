const LikesService = require("../services/likes.service");

class LikesController {
  likeService = new LikesService();

  like = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const postId = Number(req.params.postId);
      const message = await this.likeService.like({ userId, postId });
      res.status(200).json({ message });
    } catch (error) {
      console.error("[Controller] 좋아요 등록 실패:", error);
      res.status(500).json({ message: error.message, success: false });
    }
  };

  likeGet = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const result = await this.likeService.likeGet(userId);
      res.status(200).json({ result });
    } catch (error) {
      console.error("[Controller] 로그인 실패:", error);
      res.status(500).json({ message: error.message, success: false });
    }
  };
}
module.exports = LikesController;
