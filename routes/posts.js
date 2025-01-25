const Post = require("../schemas/post");
const express = require("express");
const router = express.Router();

//--게시글 전체 불러오기--//
router.get("/post", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createAt: -1 });
    res.json({ posts });
  } catch (err) {
    res.json({ msg: "오류가 발생했습니다", err });
  }
});
//--게시글 조회--//
router.get("/post/:postId", async (req, res) => {
  const postId = Number(req.params.postId);
  try {
    const post = await Post.findOne({ postId });
    res.json({ post });
  } catch (err) {
    res.json({ msg: "없는 게시글입니다.", err });
  }
});
//--게시글 수정--//
router.post("/post/:postId", async (req, res) => {
  const postId = Number(req.params.postId);
  const { content, password } = req.body;
  try {
    const postFind = await Post.findOne({ postId });
    if (postFind.password == password) {
      const post = await Post.updateOne({ postId }, { $set: { content } });
      res.json({ msg: "게시글이 변경되었습니다" });
    } else {
      res.json({ msg: "비밀번호가 틀립니다." });
    }
  } catch (err) {
    res.json({ msg: "게시글이 존재하지 않습니다", err });
  }
});
//--게시글 삭제--//]
router.post("/post/delete/:postId", async (req, res) => {
  const postId = Number(req.params.postId);
  const { password } = req.body;

  try {
    const postFind = await Post.findOne({ postId });
    if (postFind.password == password) {
      const post = await Post.deleteOne({ postId });
      res.json({ msg: "게시글이 삭제되었습니다" });
    } else {
      res.json({ msg: "비밀번호가 틀립니다." });
    }
  } catch (err) {
    res.json({ msg: "게시글이 존재하지 않습니다", err });
  }
});

//--게시글 작성--//
router.post("/post", async (req, res) => {
  const { postId, writerName, password, content } = req.body;
  try {
    const createdPost = await Post.create({
      postId,
      writerName,
      password,
      content,
    });

    res.json({ post: createdPost });
  } catch (err) {
    res.json({ msg: "게시 중 오류가 발생했습니다.", err });
  }
});

module.exports = router;
