const CommentRepository = require("../repositories/comments.repository");

class CommentService {
  commentRepository = new CommentRepository();

  getList = async (userId) => {
    try {
      return await this.commentRepository.findById({ userId });
    } catch (error) {
      console.error("[Service] 댓글 불러오기 실패:", error);
      res.status(500).json({ message: error.message, success: false });
    }
  };

  commentUpdate = async ({ commentId, content, userId }) => {
    try {
      if (content.trim().length == 0) throw new Error("내용을 입력해주세요");
      const comment = await this.commentRepository.findById(commentId);
      if (comment.userId == userId) {
        const result = await this.commentRepository.update({
          commentId,
          content,
        });
        if (result) {
          return { success: true };
        }
      }
      throw new Error("작성자만 댓글을 수정할 수 있습니다");
    } catch (error) {
      console.error("[Service] 댓글 수정 실패:", error);
      res.status(500).json({ message: error.message, success: false });
    }
  };

  commentDelete = async ({ commentId, userId }) => {
    try {
      const comment = this.commentRepository.findById(commentId);
      if (comment.userId == userId) {
        const result = await this.commentRepository.delete(commentId);
        if (result) {
          return { success: true };
        }
      }
      throw new Error("작성자만 댓글을 삭제 할 수 있습니다");
    } catch (error) {
      console.error("[Service] 댓글 삭제 실패:", error);
      res.status(500).json({ message: error.message, success: false });
    }
  };

  commentCreate = async ({ content, postId, userId }) => {
    try {
      if (content.trim().length == 0) throw new Error("내용을 입력해주세요");

      const result = await this.commentRepository.create({
        content,
        postId,
        userId,
      });
      if (result) {
        return { success: true };
      }
    } catch (error) {
      console.error("[Service] 댓글 등록 실패:", error);
      res.status(500).json({ message: error.message, success: false });
    }
  };
}
module.exports = CommentService;
