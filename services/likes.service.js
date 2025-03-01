const LikesRepository = require("../repositories/likes.repository");
const PostsRepository = require("../repositories/posts.repository");
const AppError = require("../utils/error");
class LikesService {
  likesRepository = new LikesRepository();
  postsRepository = new PostsRepository();

  like = async ({ userId, postId }) => {
    const postLike = await this.likesRepository.findFirst({
      where: {
        userId,
        postId,
      },
    });

    if (postLike === null) {
      const result = await this.likesRepository.create({ userId, postId });
      if (result) {
        return { like: true };
      }
    } else if (postLike.like === false) {
      //좋아요가 있으나 false인 경우
      const result = await this.likesRepository.update(userId, postId, true);
      if (result) {
        return { like: true };
      }
    } else {
      //좋아요가 있으나 true인 경우
      const result = await this.likesRepository.update(userId, postId, false);
      if (result) {
        return { like: false };
      }
    }
  };
  likeGet = async (userId) => {
    const posts = await postsRepository.findManyByLike(userId);
    if (!posts) return { result: "좋아요한 게시글이 없습니다" };
    const result = posts.sort((a, b) => b._count.Likes - a._count.Likes);
    return { result };
  };
}

module.exports = LikesService;
