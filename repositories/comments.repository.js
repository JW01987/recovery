const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class CommentRepository {
  getListById = async (userId) => {
    try {
      return await prisma.comments.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
    } catch (error) {
      console.error("[Repository] 댓글 조회 실패:", error);
      res.status(500).json({ message: error.message, success: false });
    }
  };
  findById = async (commentId) => {
    try {
      return await prisma.comments.findUnique({
        where: { id: +commentId },
      });
    } catch (error) {
      console.error("[Repository] 댓글 조회 실패:", error);
      res.status(500).json({ message: error.message, success: false });
    }
  };
  update = async ({ commentId, content }) => {
    try {
      return await prisma.comments.update({
        where: { id: +commentId },
        data: { content },
      });
    } catch (error) {
      console.error("[Repository] 댓글 수정 실패:", error);
      res.status(500).json({ message: error.message, success: false });
    }
  };
  delete = async (commentId) => {
    try {
      return await prisma.comments.delete({ where: { id: +commentId } });
    } catch (error) {
      console.error("[Repository] 댓글 삭제 실패:", error);
      res.status(500).json({ message: error.message, success: false });
    }
  };
  create = async ({ content, postId, userId }) => {
    try {
      return await prisma.comments.create({
        data: {
          content,
          postId: +postId,
          userId,
        },
      });
    } catch (error) {
      console.error("[Repository] 댓글 등록 실패:", error);
      res.status(500).json({ message: error.message, success: false });
    }
  };
}
module.exports = CommentRepository;
