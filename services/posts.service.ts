import { PostsRepository } from "../repositories/posts.repository";
import {
  CreatePostDto,
  DeletePostDto,
  UpdatePostDto,
} from "../utils/dtos/postDto";
import { AppError } from "../utils/error";

export class PostService {
  postsRepository = new PostsRepository();

  getPostAll = async () => {
    const allPost = await this.postsRepository.getPostAll();

    if (!allPost || allPost.length == 0) {
      throw new AppError("게시글이 존재하지 않습니다", 404);
    }

    return allPost;
  };
  getPosts = async ({ userId }: { userId: number }) => {
    const posts = await this.postsRepository.getUserPosts({ userId });

    if (!posts || posts.length == 0) {
      throw new AppError("게시글이 존재하지 않습니다", 404);
    }

    return posts;
  };
  updatePost = async ({ userId, title, content, postId }: UpdatePostDto) => {
    const postFind = await this.postsRepository.findUniquePost(userId);

    if (postFind.userId == userId) {
      await this.postsRepository.updatePost({
        title,
        content,
        postId,
      });
    } else {
      throw new AppError("작성자만 게시글을 수정할 수 있습니다", 401);
    }
  };
  deletePost = async ({ postId, userId }: DeletePostDto) => {
    const postFind = await this.postsRepository.findUniquePost(userId);

    if (postFind.userId == userId) {
      await this.postsRepository.deletePost({
        postId,
      });
    } else {
      throw new AppError("작성자만 게시글을 삭제할 수 있습니다", 401);
    }
  };
  createPost = async ({ title, content, userId }: CreatePostDto) => {
    await this.postsRepository.createPost({
      title,
      content,
      userId,
    });
  };
}

module.exports = PostService;
