import { LikeDto } from "../utils/dtos/likeDto";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export class LikesRepository {
  findFirst = async ({ userId, postId }: LikeDto) => {
    return await prisma.likes.findFirst({
      where: {
        userId,
        postId,
      },
    });
  };

  create = async ({ userId, postId }: LikeDto) => {
    return await prisma.likes.create({ data: { userId, postId } });
  };

  update = async ({ userId, postId, isLike }: LikeDto) => {
    return await prisma.likes.update({
      where: { userId_postId: { userId, postId } },
      data: { like: isLike },
    });
  };
}
