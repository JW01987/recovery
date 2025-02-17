const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserRepository {
  findByUnique = async (nickname) => {
    try {
      return await prisma.users.findUnique({
        where: { nickname },
      });
    } catch (error) {
      console.log("[Repository] 유저 조회 실패");
      throw new Error(error.message || "레포지토리에서 에러 발생");
    }
  };

  createUser = async ({ nickname, hashedPassword }) => {
    try {
      await prisma.users.create({
        data: { nickname, password: hashedPassword },
      });
    } catch (error) {
      console.log("[Repository] 유저 생성 실패");
      throw new Error(error.message || "레포지토리에서 에러 발생");
    }
  };
}

module.exports = UserRepository;
