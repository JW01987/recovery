const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class PostRepository {
  getPostAll = async () => {
    try {
      const posts = await prisma.posts.findMany({
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

      return posts;
    } catch (error) {
      console.log("[Repository] 게시글 조회 실패");
      throw new Error(error.message || "레포지토리에서 에러 발생");
    }
  };

  getUserPosts = async ({ userId }) => {
    try {
      const posts = await prisma.posts.findMany({
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
      return posts;
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
      await prisma.posts.update({
        where: { id: postId },
        data: { title, content },
      });
      return "게시글이 변경되었습니다";
    } catch (error) {
      console.log("[Repository] 게시글 수정 실패");
      throw new Error(error.message || "레포지토리에서 에러 발생");
    }
  };
  deletePost = async ({ postId }) => {
    try {
      await prisma.posts.delete({ where: { id: postId } });
      return "게시글이 삭제되었습니다";
    } catch (error) {
      console.log("[Repository] 게시글 삭제 실패");
      throw new Error(error.message || "레포지토리에서 에러 발생");
    }
  };
  createPost = async () => {
    try {
      await prisma.posts.create({
        data: {
          userId: id,
          title,
          content,
        },
      });

      return "게시글을 작성하였습니다";
    } catch (error) {
      console.log("[Repository] 게시글 등록 실패");
      throw new Error(error.message || "레포지토리에서 에러 발생");
    }
  };
}

module.exports = PostRepository;
