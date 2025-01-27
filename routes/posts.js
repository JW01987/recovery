const Post = require("../schemas/post");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

//--게시글 전체 불러오기--//
router.get("/postAll", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "nickname")
      .sort({ createAt: -1 });
    res.json({ posts });
  } catch (err) {
    res.json({ msg: "오류가 발생했습니다", err });
  }
});
//--게시글 조회 (로그인 한 사람의 게시글만)--//
router.get("/post", authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;
    const posts = await Post.find({ userId: id })
      .populate("userId", "nickname")
      .sort({ createAt: -1 });
    res.json({ posts });
  } catch (err) {
    res.json({ msg: "존재하지 않은 게시글입니다.", err });
  }
});
//--게시글 수정--//
router.post("/post/update/:postId", authMiddleware, async (req, res) => {
  const { id } = req.user;
  const { title, content } = req.body;
  const { postId } = req.params;
  try {
    const postFind = await Post.findById(postId);
    if (postFind.userId == id) {
      const post = await Post.updateOne(
        { _id: postId },
        { $set: { title, content } }
      );
      res.json({ msg: "게시글이 변경되었습니다", post });
    } else {
      res.json({ msg: "비밀번호가 틀립니다." });
    }
  } catch (err) {
    res.json({ msg: "게시글이 존재하지 않습니다", err });
  }
});
//--게시글 삭제--//
router.post("/post/delete/:postId", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { id } = req.user;
  try {
    const postFind = await Post.findById(postId);
    if (postFind.userId == id) {
      await Post.deleteOne({ _id: postId });
      res.json({ msg: "게시글이 삭제되었습니다" });
    } else {
      res.json({ msg: "본인이 작성한 게시글만 삭제할 수 있습니다." });
    }
  } catch (err) {
    res.json({ msg: "게시글이 존재하지 않습니다", err });
  }
});

//--게시글 작성--//
router.post("/post", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;
  try {
    const post = await Post.create({
      userId: id,
      title,
      content,
    });

    res.json({ post, msg: "게시글이 등록되었습니다" });
  } catch (err) {
    res.json({ msg: "게시 중 오류가 발생했습니다.", err });
  }
});

module.exports = router;
