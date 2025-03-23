const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export class UserRepository {
  findByUnique = async (nickname: string) => {
    return await prisma.users.findUnique({
      where: { nickname },
    });
  };

  createUser = async ({
    nickname,
    hashedPassword,
  }: {
    nickname: string;
    hashedPassword: string;
  }) => {
    return await prisma.users.create({
      data: { nickname, password: hashedPassword },
    });
  };
}
