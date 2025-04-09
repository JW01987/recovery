import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostDto, UpdatePostDto } from "../dto/postDto";
import { Posts } from "@prisma/client";
@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPostAll() {
    const allPost = await this.prisma.posts.findMany({
      include: {
        Users: {
          select: {
            nickname: true, //닉네임 가져오기
          },
        },
        _count: {
          select: {
            Likes: {
              where: { like: true }, // 좋아요가 true인 개수만 세기
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!allPost || allPost.length == 0) {
      throw new HttpException("게시글이 존재하지 않습니다", 404);
    }

    return allPost;
  }

  async getPosts({ userId }: { userId: number }) {
    const posts = await this.prisma.posts.findMany({
      where: { userId },
      include: {
        Users: {
          select: {
            nickname: true,
          },
        },
        _count: {
          select: {
            Likes: {
              where: { like: true }, // 좋아요가 true인 개수만 세기
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!posts || posts.length == 0) {
      throw new HttpException("게시글이 존재하지 않습니다", 404);
    }
    return posts;
  }

  async updatePost({ userId, title, content, postId }: UpdatePostDto) {
    const postFind: Posts | null = await this.prisma.posts.findUnique({
      where: { id: postId },
    });
    if (postFind == null)
      throw new HttpException("게시글이 존재하지 않습니다", 404);
    if (postFind.userId == userId) {
      await this.prisma.posts.update({
        where: { id: postId },
        data: { title, content },
      });
    } else {
      throw new HttpException("작성자만 게시글을 수정할 수 있습니다", 401);
    }
  }

  async deletePost({ postId, userId }: { postId: number; userId: number }) {
    const postFind: Posts | null = await this.prisma.posts.findUnique({
      where: { id: postId },
    });
    if (postFind == null)
      throw new HttpException("게시글이 존재하지 않습니다", 404);

    if (postFind.userId == userId) {
      await this.prisma.posts.delete({ where: { id: postId } });
    } else {
      throw new HttpException("작성자만 게시글을 삭제할 수 있습니다", 401);
    }
  }

  async createPost({ title, content, userId }: CreatePostDto) {
    if (title.length == 0 || content.length == 0)
      throw new HttpException("제목과 내용은 비워둘 수 없습니다", 400);
    return await this.prisma.posts.create({
      data: {
        userId,
        title,
        content,
      },
    });
  }
}
