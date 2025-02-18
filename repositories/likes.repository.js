const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class LikesRepository {
  findFirst = async ({ userId, postId }) => {
    try {
      return await prisma.likes.findFirst({
        where: {
          userId,
          postId,
        },
      });
    } catch (error) {
      console.log("[Repository] 좋아요 게시글 조회 실패");
      throw new Error(error.message || "레포지토리에서 에러 발생");
    }
  };

  create = async ({ userId, postId }) => {
    try {
      return await prisma.likes.create({ data: { userId, postId } });
    } catch (error) {
      console.log("[Repository] 좋아요 생성 실패");
      throw new Error(error.message || "레포지토리에서 에러 발생");
    }
  };

  update = async (userId, postId, isLike) => {
    try {
      return await prisma.likes.update({
        where: { userId_postId: { userId, postId } },
        data: { like: isLike },
      });
    } catch (error) {
      console.log("[Repository] 좋아요 생성 실패");
      throw new Error(error.message || "레포지토리에서 에러 발생");
    }
  };
}

module.exports = LikesRepository;
