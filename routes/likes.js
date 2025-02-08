const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//- 좋아요 누르기 & 취소하기 -//
router.post("/like/:postId", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const postId = Number(req.params.postId);
  try {
    const postLike = await prisma.likes.findFirst({
      where: {
        userId,
        postId,
      },
    });

    if (postLike === null) {
      await prisma.likes.create({ data: { userId, postId } });
      return res.json({ msg: "좋아요를 눌렀습니다" });
    } else if (postLike.like === false) {
      //좋아요가 있으나 false인 경우
      await prisma.likes.update({
        where: { userId_postId: { userId, postId } },
        data: { like: true },
      });
      return res.json({ msg: "좋아요를 눌렀습니다" });
    } else {
      //좋아요가 있으나 true인 경우
      const a = await prisma.likes.update({
        where: { userId_postId: { userId, postId } },
        data: { like: false },
      });
      return res.json({ msg: "좋아요를 취소했습니다" });
    }
  } catch (err) {
    return res.json({ msg: "오류발생", err });
  }
});

//-좋아요 한 게시글확인, 좋아요 많은 수대로-//
router.get("/like", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    // 제목, 작성자명(nickname), 작성 날짜, 좋아요 갯수를 조회하기
    const posts = await prisma.posts.findMany({
      where: {
        Likes: {
          some: {
            userId, // 특정 유저가 좋아요를 누른 게시글만
            like: true, // 좋아요가 true인 게시글만
          },
        },
      },
      include: {
        Users: {
          select: { nickname: true }, // 작성자의 닉네임
        },
        _count: {
          select: {
            Likes: {
              where: { like: true }, // 좋아요가 true인 경우만 카운트
            },
          },
        },
      },
    });
    const sortedPosts = posts.sort((a, b) => b._count.Likes - a._count.Likes);

    res.json({ sortedPosts });
  } catch (err) {
    return res.json({ msg: "에러", err });
  }
});

module.exports = router;
