const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const CommentsController = require("../controllers/comments.controller");
const commentsController = new CommentsController();

router.get("/comment", authMiddleware, commentsController.commentList);
router.patch(
  "/comment/:commentId",
  authMiddleware,
  commentsController.commentUpdate
);
router.delete(
  "/comment/:commentId",
  authMiddleware,
  commentsController.commentDelete
);
router.post("/comment", authMiddleware, commentsController.commentCreate);
//--댓글 목록 조회 (본인이 작성한 댓글 목록)--//
router.get("/comment", authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;
    const comments = await prisma.comments.findMany({
      where: { userId: id },
      orderBy: { createdAt: "desc" },
    });
    res.json({ comments });
  } catch (err) {
    res.json({ msg: "오류가 발생했습니다.", err });
  }
});

//--댓글 수정--//
router.patch("/comment/update/:commentId", authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const { id } = req.user;
  if (content.trim().length == 0)
    return res.json({ msg: "내용을 입력해주세요" });
  try {
    const comment = await prisma.comments.findUnique({
      where: { id: +commentId },
    });
    if (comment.userId == id) {
      await prisma.comments.update({
        where: { id: +commentId },
        data: { content },
      });
      return res.json({ msg: "댓글이 업데이트 되었습니다" });
    }
    res.json({ msg: "작성자만 댓글을 수정할 수 있습니다" });
  } catch (err) {
    res.json({ msg: "오류가 발생했습니다", err });
  }
});

//--댓글 삭제--//
router.delete(
  "/comment/delete/:commentId",
  authMiddleware,
  async (req, res) => {
    const { commentId } = req.params;
    const { id } = req.user;
    try {
      const comment = await prisma.comments.findUnique({
        where: { id: +commentId },
      });
      if (comment.userId == id) {
        await prisma.comments.delete({ where: { id: +commentId } });
        return res.json({ msg: "댓글이 삭제되었습니다" });
      }
      res.json({ msg: "로그인 후 삭제할 수 있습니다" });
    } catch (err) {
      res.json({ msg: "오류가 발생했습니다", err });
    }
  }
);

//--댓글 작성--//
router.post("/comment", authMiddleware, async (req, res) => {
  const { content, postId } = req.body;
  const { id } = req.user;
  if (content.trim().length == 0)
    return res.json({ msg: "내용을 입력해주세요" });
  try {
    const comment = await prisma.comments.create({
      data: {
        content,
        postId: +postId,
        userId: id,
      },
    });
    res.json({ comment, msg: "댓글 작성이 완료되었습니다" });
  } catch (err) {
    res.json({ msg: "오류가 발생했습니다.", err });
  }
});

module.exports = router;
