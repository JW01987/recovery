import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  CommentCreateDto,
  CommentDeleteDto,
  CommentUpdateDto,
} from "../dto/commentDto";
import { Comments } from "@prisma/client";

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}
  async getList(userId: number) {
    return await this.prisma.comments.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async commentUpdate({ commentId, content, userId }: CommentUpdateDto) {
    if (String(content).length == 0)
      throw new HttpException("내용을 입력해주세요", 400);
    const comment: Comments | null = await this.prisma.comments.findUnique({
      where: { id: commentId },
    });
    if (!comment) throw new HttpException("존재하지 않은 댓글입니다", 404);
    if (comment.userId == userId) {
      await this.prisma.comments.update({
        where: { id: commentId },
        data: { content },
      });
      return true;
    }
    throw new HttpException("작성자만 댓글을 수정할 수 있습니다", 401);
  }

  async commentDelete({ commentId, userId }: CommentDeleteDto) {
    const comment: Comments | null = await this.prisma.comments.findUnique({
      where: { id: commentId },
    });
    if (!comment) throw new HttpException("존재하지 않은 댓글입니다", 404);
    if (comment.userId == userId) {
      await this.prisma.comments.delete({ where: { id: commentId } });
      return true;
    }
    throw new HttpException("작성자만 댓글을 삭제 할 수 있습니다", 401);
  }

  async commentCreate({ content, postId, userId }: CommentCreateDto) {
    if (String(content).trim().length == 0)
      throw new HttpException("내용을 입력해주세요", 400);

    return await this.prisma.comments.create({
      data: {
        content,
        postId,
        userId,
      },
    });
  }
}
