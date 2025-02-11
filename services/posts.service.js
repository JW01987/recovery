const PostRepository = require("../repositories/posts.repository");

class PostService {
  postRepository = new PostRepository();

  getPostAll = async () => {
    try {
      const allPost = await this.postRepository.getPostAll();

      if (!allPost || allPost.length == 0) {
        throw new Error("게시글이 존재하지 않습니다");
      }

      return allPost;
    } catch (error) {
      console.log("[Service] 게시글 조회 실패");
      throw new Error(error.message || "서비스에서 에러 발생");
    }
  };
  getPosts = async ({ userId }) => {
    try {
      const posts = await this.postRepository.getPosts({ userId });

      if (!posts || posts.length == 0) {
        throw new Error("게시글이 존재하지 않습니다");
      }

      return posts;
    } catch (error) {
      console.log("[Service] 게시글 조회 실패");
      throw new Error(error.message || "서비스에서 에러 발생");
    }
  };
  updatePost = async ({ userId, title, content, postId }) => {
    try {
      const result = await this.postRepository.updatePost({
        userId,
        title,
        content,
        postId,
      });

      return result;
    } catch (error) {
      console.log("[Service] 게시글 수정 실패");
      throw new Error(error.message || "서비스에서 에러 발생");
    }
  };
  deletePost = async ({ postId, userId }) => {
    try {
      const result = await this.postRepository.deletePost({
        postId,
        userId,
      });

      return result;
    } catch (error) {
      console.log("[Service] 게시글 삭제 실패");
      throw new Error(error.message || "서비스에서 에러 발생");
    }
  };
  createPost = async ({ title, content, userId }) => {
    try {
      const result = await this.postRepository.createPost({
        title,
        content,
        userId,
      });

      return result;
    } catch (error) {
      console.log("[Service] 게시글 등록 실패");
      throw new Error(error.message || "서비스에서 에러 발생");
    }
  };
}

module.exports = PostService;
