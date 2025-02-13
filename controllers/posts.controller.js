const PostService = require("../services/posts.service");

class PostsController {
  postService = new PostService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당

  getPostAll = async (req, res, next) => {
    try {
      const posts = await this.postService.getPostAll();
      res.status(200).json({ data: posts });
    } catch (error) {
      console.error("[Controller] 게시글 조회 실패:", error);
      res.status(500).json({ message: error.message, success: false });
    }
  };

  getPosts = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const userPost = await this.postService.getPosts(userId);
      res.status(200).json({ data: userPost });
    } catch (error) {
      console.error("[Controller] 게시글 조회 실패:", error);
      res.status(500).json({ message: error.message, success: false });
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { title, content } = req.body;
      const postId = Number(req.params.postId);

      const message = await this.postService.updatePost({
        userId,
        title,
        content,
        postId,
      });

      res.status(200).json({ message });
    } catch (error) {
      console.error("[Controller] 게시글 수정 실패:", error);
      res.status(500).json({ message: error.message, success: false });
    }
  };
  deletePost = async (req, res, next) => {
    try {
      const postId = Number(req.params.postId);
      const userId = req.user.id;

      const message = await this.postService.deletePost({ postId, userId });

      res.status(200).json({ message });
    } catch (error) {
      console.error("[Controller] 게시글 삭제 실패:", error);
      res.status(500).json({ message: error.message, success: false });
    }
  };
  createPost = async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const userId = req.user.id;

      const message = await this.postService.createPost({
        title,
        content,
        userId,
      });

      res.status(200).json({ message });
    } catch (error) {
      console.error("[Controller] 게시글 등록 실패:", error);
      res.status(500).json({ message: error.message, success: false });
    }
  };
}

module.exports = PostsController;
