const CommentRepository = require("../repositories/comments.repository");
const AppError = require("../utils/error");
class CommentService {
  commentRepository = new CommentRepository();

  getList = async (userId) => {
    return await this.commentRepository.findById({ userId });
  };

  commentUpdate = async ({ commentId, content, userId }) => {
    if (content.trim().length == 0)
      throw new AppError("내용을 입력해주세요", 400);
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) throw AppError("존재하지 않은 댓글입니다", 404);
    if (comment.userId == userId) {
      const result = await this.commentRepository.update({
        commentId,
        content,
      });
      if (result) {
        return { success: true };
      }
    }
    throw new AppError("작성자만 댓글을 수정할 수 있습니다", 401);
  };

  commentDelete = async ({ commentId, userId }) => {
    const comment = this.commentRepository.findById(commentId);
    if (!comment) throw AppError("존재하지 않은 댓글입니다", 404);
    if (comment.userId == userId) {
      const result = await this.commentRepository.delete(commentId);
      if (result) {
        return { success: true };
      }
    }
    throw new AppError("작성자만 댓글을 삭제 할 수 있습니다", 401);
  };

  commentCreate = async ({ content, postId, userId }) => {
    if (content.trim().length == 0)
      throw new AppError("내용을 입력해주세요", 400);

    const result = await this.commentRepository.create({
      content,
      postId,
      userId,
    });
    if (result) {
      return { success: true };
    }
  };
}
module.exports = CommentService;
