const PostRepository = require("../repositories/posts.repository");
const AppError = require("../utils/error");
class PostService {
  postRepository = new PostRepository();

  getPostAll = async () => {
    const allPost = await this.postRepository.getPostAll();

    if (!allPost || allPost.length == 0) {
      throw new AppError("게시글이 존재하지 않습니다", 404);
    }

    return allPost;
  };
  getPosts = async ({ userId }) => {
    const posts = await this.postRepository.getUserPosts({ userId });

    if (!posts || posts.length == 0) {
      throw new AppError("게시글이 존재하지 않습니다", 404);
    }

    return posts;
  };
  updatePost = async ({ userId, title, content, postId }) => {
    const postFind = await this.postRepository.findUniquePost(userId);

    if (postFind.userId == userId) {
      const result = await this.postRepository.updatePost({
        title,
        content,
        postId,
      });
      if (result) {
        return { success: true };
      }
    } else {
      throw new AppError("작성자만 게시글을 수정할 수 있습니다", 401);
    }
  };
  deletePost = async ({ postId, userId }) => {
    const postFind = await this.postRepository.findUniquePost(userId);

    if (postFind.userId == userId) {
      const result = await this.postRepository.deletePost({
        postId,
      });
      if (result) {
        return { success: true };
      }
    } else {
      throw new AppError("작성자만 게시글을 삭제할 수 있습니다", 401);
    }
  };
  createPost = async ({ title, content, userId }) => {
    const result = await this.postRepository.createPost({
      title,
      content,
      userId,
    });

    if (result) {
      return { success: true };
    }
  };
}

module.exports = PostService;
