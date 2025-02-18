const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class PostRepository {
  getPostAll = async () => {
    try {
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
    } catch (error) {
      console.log("[Repository] 게시글 조회 실패");
      throw new Error(error.message || "레포지토리에서 에러 발생");
    }
  };

  getUserPosts = async ({ userId }) => {
    try {
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
    } catch (error) {
      console.log("[Repository] 게시글 조회 실패");
      throw new Error(error.message || "레포지토리에서 에러 발생");
    }
  };

  findUniquePost = async (id) => {
    return await prisma.posts.findUnique({
      where: { id },
    });
  };
  updatePost = async ({ title, content, postId }) => {
    try {
      return await prisma.posts.update({
        where: { id: postId },
        data: { title, content },
      });
    } catch (error) {
      console.log("[Repository] 게시글 수정 실패");
      throw new Error(error.message || "레포지토리에서 에러 발생");
    }
  };
  deletePost = async ({ postId }) => {
    try {
      return await prisma.posts.delete({ where: { id: postId } });
    } catch (error) {
      console.log("[Repository] 게시글 삭제 실패");
      throw new Error(error.message || "레포지토리에서 에러 발생");
    }
  };
  createPost = async () => {
    try {
      return await prisma.posts.create({
        data: {
          userId: id,
          title,
          content,
        },
      });
    } catch (error) {
      console.log("[Repository] 게시글 등록 실패");
      throw new Error(error.message || "레포지토리에서 에러 발생");
    }
  };

  findManyByLike = async (userId) => {
    try {
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
    } catch (error) {
      console.log("[Repository] 게시글 조회 실패");
      throw new Error(error.message || "레포지토리에서 에러 발생");
    }
  };
}

module.exports = PostRepository;
