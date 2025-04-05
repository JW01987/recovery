import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LikeDto } from "../dto/likeDto";

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}

  async like({ userId, postId }: LikeDto) {
    const postLike = await this.prisma.likes.findFirst({
      where: {
        userId,
        postId,
      },
    });
    if (postLike === null) {
      await this.prisma.likes.create({ data: { userId, postId } });
      return true;
    } else if (postLike.like === false) {
      //좋아요가 있으나 false인 경우
      await this.prisma.likes.update({
        where: { userId_postId: { userId, postId } },
        data: { like: true },
      });
      return true;
    } else {
      //좋아요가 있으나 true인 경우
      await this.prisma.likes.update({
        where: { userId_postId: { userId, postId } },
        data: { like: false },
      });
      return false;
    }
  }
  async likeGet(userId: number) {
    const posts = await this.prisma.posts.findMany({
      where: {
        Likes: {
          some: {
            userId, // 특정 유저가 좋아요를 누른 게시글만
            like: true, // 좋아요가 true인 게시글만
          },
        },
      },
      include: {
        Users: {
          select: { nickname: true }, // 작성자의 닉네임
        },
        _count: {
          select: {
            Likes: {
              where: { like: true }, // 좋아요가 true인 경우만 카운트
            },
          },
        },
      },
    });
    if (!posts) return { result: "좋아요한 게시글이 없습니다" };
    const result = posts.sort(
      (a: any, b: any) => b._count.Likes - a._count.Likes
    );
    return { result };
  }
}
