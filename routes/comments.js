const Comment = require("../schemas/comment");
const express = require("express");
const router = express.Router();

//--댓글 목록 조회--//
router.get("/comment/:postId", async (req, res) => {
  const postId = Number(req.params.postId);
  try {
    const comment = await Comment.find({ postId }).sort({ createAt: -1 });
    res.json({ comment });
  } catch (err) {
    res.json({ msg: "오류가 발생했습니다.", err });
  }
});
//--댓글 수정--//
router.post("/comment/:commentId", async (req, res) => {
  const commentId = Number(req.params.commentId);
  const { content } = req.body;
  if (content.trim().length > 0) {
    try {
      await Comment.updateOne({ commentId }, { $set: { content } });
      res.json({ msg: "댓글이 업데이트 되었습니다" });
    } catch (err) {
      res.json({ msg: "오류가 발생했습니다", err });
    }
  } else {
    res.json({ msg: "내용을 입력해주세요" });
  }
});
//--댓글 삭제--//
router.post("/comment/delete/:commentId", async (req, res) => {
  const commentId = Number(req.params.commentId);
  try {
    await Comment.deleteOne({ commentId });
    res.json({ msg: "댓글이 삭제되었습니다" });
  } catch (err) {
    res.json({ msg: "오류가 발생했습니다", err });
  }
});

//--댓글 작성--//
router.post("/comment", async (req, res) => {
  const { commentId, content, postId } = req.body;
  if (content) {
    try {
      const createdComment = await Comment.create({
        commentId,
        content,
        postId,
      });

      res.json({ comment: createdComment });
    } catch (err) {
      res.json({ msg: "게시 중 오류가 발생했습니다.", err });
    }
  } else {
    res.json({ msg: "내용을 작성해주세요" });
  }
});

module.exports = router;
