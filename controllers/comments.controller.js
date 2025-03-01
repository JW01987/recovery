const CommentService = require("../services/comments.service");

class CommentsController {
  commentService = new CommentService();

  commentList = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const result = await this.commentService.getList(userId);
      res.status(200).json({ result });
    } catch (error) {
      console.error("[Controller] 댓글 불러오기 실패:", error);
      next(error);
    }
  };
  commentUpdate = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { content } = req.body;
      const userId = req.user.id;
      const { success } = await this.commentService.commentUpdate({
        commentId,
        content,
        userId,
      });
      if (success) {
        return res.status(200).json({ message: "댓글 수정 완료" });
      }
    } catch (error) {
      console.error("[Controller] 댓글 수정 실패:", error);
      next(error);
    }
  };
  commentDelete = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const userId = req.user.id;

      const { success } = await this.commentService.commentDelete({
        commentId,
        userId,
      });
      if (success) {
        return res.status(200).json({ message: "댓글 삭제 완료" });
      }
    } catch (error) {
      console.error("[Controller] 댓글 삭제 실패:", error);
      next(error);
    }
  };
  commentCreate = async (req, res, next) => {
    try {
      const { content, postId } = req.body;
      const userId = req.user.id;

      const { success } = await this.commentService.commentCreate({
        content,
        postId,
        userId,
      });
      if (success) {
        return res.status(200).json({ message: "댓글 등록 완료" });
      }
    } catch (error) {
      console.error("[Controller] 댓글 작성 실패:", error);
      next(error);
    }
  };
}

module.exports = CommentsController;
