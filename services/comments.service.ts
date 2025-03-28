import { Comments } from "@prisma/client";
import { CommentRepository } from "../repositories/comments.repository";
import {
  CommentCreateDto,
  CommentDeleteDto,
  CommentUpdateDto,
} from "../utils/dtos/commentDto";
import { AppError } from "../utils/error";

export class CommentService {
  commentRepository = new CommentRepository();

  getList = async (userId: number) => {
    return await this.commentRepository.getListById(userId);
  };

  commentUpdate = async ({ commentId, content, userId }: CommentUpdateDto) => {
    if (content.trim().length == 0)
      throw new AppError("내용을 입력해주세요", 400);
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) throw new AppError("존재하지 않은 댓글입니다", 404);
    if (comment.userId == userId) {
      await this.commentRepository.update({
        commentId,
        content,
      });
      return true;
    }
    throw new AppError("작성자만 댓글을 수정할 수 있습니다", 401);
  };

  commentDelete = async ({ commentId, userId }: CommentDeleteDto) => {
    const comment: Comments = await this.commentRepository.findById(commentId);
    if (!comment) throw new AppError("존재하지 않은 댓글입니다", 404);
    if (comment.userId == userId) {
      await this.commentRepository.delete(commentId);
      return true;
    }
    throw new AppError("작성자만 댓글을 삭제 할 수 있습니다", 401);
  };

  commentCreate = async ({ content, postId, userId }: CommentCreateDto) => {
    if (content.trim().length == 0)
      throw new AppError("내용을 입력해주세요", 400);

    return await this.commentRepository.create({
      content,
      postId,
      userId,
    });
  };
}
