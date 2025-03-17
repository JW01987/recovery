import { LikesRepository } from "../repositories/likes.repository";
import { PostsRepository } from "../repositories/posts.repository";
import { likeDto } from "../utils/dtos/likeDto";

export class LikeService {
  likesRepository = new LikesRepository();
  postsRepository = new PostsRepository();

  like = async ({ userId, postId }: likeDto) => {
    const postLike = await this.likesRepository.findFirst({ userId, postId });

    if (postLike === null) {
      await this.likesRepository.create({ userId, postId });
      return true;
    } else if (postLike.like === false) {
      //좋아요가 있으나 false인 경우
      await this.likesRepository.update({ userId, postId, isLike: true });
      return true;
    } else {
      //좋아요가 있으나 true인 경우
      await this.likesRepository.update({ userId, postId, isLike: false });
      return false;
    }
  };
  likeGet = async (userId: number) => {
    const posts = await this.postsRepository.findManyByLike(userId);
    if (!posts) return { result: "좋아요한 게시글이 없습니다" };
    const result = posts.sort(
      (a: any, b: any) => b._count.Likes - a._count.Likes
    );
    return { result };
  };
}

module.exports = LikeService;
