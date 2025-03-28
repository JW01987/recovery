const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export class CommentRepository {
  getListById = async (userId: number) => {
    return await prisma.comments.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  };
  findById = async (commentId: number) => {
    return await prisma.comments.findUnique({
      where: { id: commentId },
    });
  };
  update = async ({
    commentId,
    content,
  }: {
    commentId: number;
    content: string;
  }) => {
    return await prisma.comments.update({
      where: { id: commentId },
      data: { content },
    });
  };
  delete = async (commentId: number) => {
    return await prisma.comments.delete({ where: { id: commentId } });
  };
  create = async ({
    content,
    postId,
    userId,
  }: {
    content: string;
    postId: number;
    userId: number;
  }) => {
    return await prisma.comments.create({
      data: {
        content,
        postId,
        userId,
      },
    });
  };
}
