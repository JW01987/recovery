const LikesRepository = require("../repositories/likes.repository");
const PostsRepository = require("../repositories/posts.repository");

class LikesService {
  likesRepository = new LikesRepository();
  postsRepository = new PostsRepository();

  like = async ({ userId, postId }) => {
    try {
      const postLike = await this.likesRepository.findFirst({
        where: {
          userId,
          postId,
        },
      });

      if (postLike === null) {
        return await this.likesRepository.create({ userId, postId });
      } else if (postLike.like === false) {
        //좋아요가 있으나 false인 경우
        await this.likesRepository.update(userId, postId, true);
        return "좋아요를 눌렀습니다";
      } else {
        //좋아요가 있으나 true인 경우
        await this.likesRepository.update(userId, postId, false);
        return "좋아요를 취소했습니다";
      }
    } catch (error) {
      console.log("[Service] 좋아요 실패");
      throw new Error(error.message || "서비스에서 에러 발생");
    }
  };
  likeGet = async (userId) => {
    try {
      const posts = await postsRepository.findManyByLike(userId);
      const result = posts.sort((a, b) => b._count.Likes - a._count.Likes);
      return { result };
    } catch (error) {
      console.log("[Service] 좋아요 게시글 조회 실패");
      throw new Error(error.message || "서비스에서 에러 발생");
    }
  };
}

module.exports = LikesService;
