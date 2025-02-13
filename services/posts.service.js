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
      const posts = await this.postRepository.getUserPosts({ userId });

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
      console.log("postId", postId);
      console.log("userId", userId);

      const postFind = await this.postRepository.findUniquePost(userId);

      if (postFind.userId == userId) {
        const message = await this.postRepository.updatePost({
          title,
          content,
          postId,
        });
        return message;
      } else {
        throw new Error("작성자만 게시글을 수정할 수 있습니다");
      }
    } catch (error) {
      console.log("[Service] 게시글 수정 실패");
      throw new Error(error.message || "서비스에서 에러 발생");
    }
  };
  deletePost = async ({ postId, userId }) => {
    try {
      console.log("postId", postId);
      console.log("userId", userId);

      const postFind = await this.postRepository.findUniquePost(userId);

      if (postFind.userId == userId) {
        const message = await this.postRepository.deletePost({
          postId,
        });
        return message;
      } else {
        throw new Error("작성자만 게시글을 삭제할 수 있습니다");
      }
    } catch (error) {
      console.log("[Service] 게시글 삭제 실패");
      throw new Error(error.message || "서비스에서 에러 발생");
    }
  };
  createPost = async ({ title, content, userId }) => {
    try {
      const message = await this.postRepository.createPost({
        title,
        content,
        userId,
      });

      return message;
    } catch (error) {
      console.log("[Service] 게시글 등록 실패");
      throw new Error(error.message || "서비스에서 에러 발생");
    }
  };
}

module.exports = PostService;
