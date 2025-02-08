const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//--게시글 전체 불러오기--// + 좋아요 갯수
router.get("/postall", async (req, res) => {
  try {
    const posts = await prisma.posts.findMany({
      include: {
        Users: {
          select: {
            nickname: true, //닉네임 가져오기
          },
        },
        _count: {
          select: {
            Likes: {
              where: { like: true }, // 좋아요가 true인 개수만 세기
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.json({ posts });
  } catch (err) {
    return res.json({ msg: "오류가 발생했습니다", err });
  }
});
//--게시글 조회 (로그인 한 사람의 게시글만)--//+ 좋아요 갯수
router.get("/post", authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;
    const posts = await prisma.posts.findMany({
      where: { userId: id },
      include: {
        Users: {
          select: {
            nickname: true,
          },
        },
        _count: {
          select: {
            Likes: {
              where: { like: true }, // 좋아요가 true인 개수만 세기
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
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
    const postFind = await prisma.posts.findUnique({ where: { id: +postId } });
    if (postFind.userId == id) {
      await prisma.posts.update({
        where: { id: +postId },
        data: { title, content },
      });
      return res.json({ msg: "게시글이 변경되었습니다" });
    } else {
      return res.json({ msg: "작성자만 수정할 수 있습니다" });
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
    const postFind = await prisma.posts.findUnique({ where: { id: +postId } });
    if (postFind.userId == id) {
      await prisma.posts.delete({ where: { id: +postId } });
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
    const post = await prisma.posts.create({
      data: {
        userId: id,
        title,
        content,
      },
    });
    res.json({ post, msg: "게시글이 등록되었습니다" });
  } catch (err) {
    res.json({ msg: "게시 중 오류가 발생했습니다.", err });
  }
});

module.exports = router;
