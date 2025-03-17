import { CreatePostDto } from "../utils/dtos/postDto";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export class PostsRepository {
  getPostAll = async () => {
    return await prisma.posts.findMany({
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
  };

  getUserPosts = async ({ userId }: { userId: number }) => {
    return await prisma.posts.findMany({
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
  };

  findUniquePost = async (id: number) => {
    return await prisma.posts.findUnique({
      where: { id },
    });
  };
  updatePost = async ({
    title,
    content,
    postId,
  }: {
    title: string;
    content: string;
    postId: number;
  }) => {
    return await prisma.posts.update({
      where: { id: postId },
      data: { title, content },
    });
  };
  deletePost = async ({ postId }: { postId: number }) => {
    return await prisma.posts.delete({ where: { id: postId } });
  };
  createPost = async ({ title, content, userId }: CreatePostDto) => {
    return await prisma.posts.create({
      data: {
        userId,
        title,
        content,
      },
    });
  };

  findManyByLike = async (userId: number) => {
    return await prisma.posts.findMany({
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
  };
}

module.exports = PostsRepository;
