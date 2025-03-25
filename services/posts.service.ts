import { connect } from "http2";
import { PostsRepository } from "../repositories/posts.repository";
import {
  CreatePostDto,
  DeletePostDto,
  UpdatePostDto,
} from "../utils/dtos/postDto";
import { AppError } from "../utils/error";
import { Posts, Users } from "@prisma/client";

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
    const postFind: Posts = await this.postsRepository.findUniquePost(postId);
    if (title.length == 0 || content.length == 0)
      throw new AppError("제목과 내용은 비워둘 수 없습니다", 400);
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
    const postFind: Posts = await this.postsRepository.findUniquePost(postId);

    if (postFind.userId == userId) {
      await this.postsRepository.deletePost({
        postId,
      });
    } else {
      throw new AppError("작성자만 게시글을 삭제할 수 있습니다", 401);
    }
  };
  createPost = async ({ title, content, userId }: CreatePostDto) => {
    if (title.length == 0 || content.length == 0)
      throw new AppError("제목과 내용은 비워둘 수 없습니다", 400);
    return await this.postsRepository.createPost({
      title,
      content,
      userId,
    });
  };
}
