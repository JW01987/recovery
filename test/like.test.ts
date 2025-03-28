import request from "supertest";
import app from "../app";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

describe("좋아요 등록, 취소 테스트", () => {
  let postToken: string;
  let likeToken: string;
  let postId: number;
  beforeAll(async () => {
    async function makeToken({
      nickname,
      password,
    }: {
      nickname: string;
      password: string;
    }) {
      await request(app).post("/api/register").send({ nickname, password });

      const res = await request(app)
        .get("/api/login")
        .send({ nickname, password });

      const rawCookie = res.headers["set-cookie"][0]; // 쿠키 값 가져오기
      return rawCookie.split(";")[0];
    }

    postToken = await makeToken({
      nickname: "kim4",
      password: "pass@1234@word",
    });
    likeToken = await makeToken({
      nickname: "park3",
      password: "pass@5678@word",
    });

    const result = await request(app)
      .post("/api/post")
      .set("Cookie", postToken)
      .send({ title: "kim의 게시물", content: "게시글 내용" });

    postId = result.body.postId;
  });

  test("❌ 좋아요 등록 - 실패(로그인 안 함)", async () => {
    const res = await request(app).post(`/api/like/${postId}`);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("로그인 후 이용 가능한 기능입니다.");
  });

  test("✅ 좋아요 등록 - 성공(좋아요 등록)", async () => {
    const res = await request(app)
      .post(`/api/like/${postId}`)
      .set("Cookie", likeToken);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("좋아요를 등록했습니다");
  });

  test("✅ 좋아요 등록 - 성공(좋아요 취소)", async () => {
    const res = await request(app)
      .post(`/api/like/${postId}`)
      .set("Cookie", likeToken);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("좋아요를 취소했습니다");
  });

  afterAll(async () => {
    await prisma.users.deleteMany();
    await prisma.posts.deleteMany();
    await prisma.likes.deleteMany();
  });
});

describe("좋아요한 게시글 불러오기 테스트", () => {
  let postToken1: string;
  let postToken2: string;
  let postToken3: string;
  let postToken4: string;
  let likeToken: string;
  beforeAll(async () => {
    async function makeToken({
      nickname,
      password,
    }: {
      nickname: string;
      password: string;
    }) {
      await request(app).post("/api/register").send({ nickname, password });

      const res = await request(app)
        .get("/api/login")
        .send({ nickname, password });

      const rawCookie = res.headers["set-cookie"][0]; // 쿠키 값 가져오기
      return rawCookie.split(";")[0];
    }

    async function makePostLike(token: string, title: string, content: string) {
      const result = await request(app)
        .post("/api/post")
        .set("Cookie", token)
        .send({ title, content });

      await request(app)
        .post(`/api/like/${result.body.postId}`)
        .set("Cookie", likeToken);
    }

    postToken1 = await makeToken({
      nickname: "kim5",
      password: "pass@1234@word",
    });
    postToken2 = await makeToken({
      nickname: "kim6",
      password: "pass@1234@word",
    });
    postToken3 = await makeToken({
      nickname: "kim7",
      password: "pass@1234@word",
    });
    postToken4 = await makeToken({
      nickname: "kim8",
      password: "pass@1234@word",
    });
    likeToken = await makeToken({
      nickname: "park5",
      password: "pass@5678@word",
    });

    await makePostLike(postToken1, "kim1의 게시글", "내용1");
    await makePostLike(postToken2, "kim2의 게시글", "내용2");
    await makePostLike(postToken3, "kim3의 게시글", "내용3");
    await makePostLike(postToken4, "kim4의 게시글", "내용4");
  });

  test("❌ 좋아요한 게시글 모두 불러오기 - 실패(로그인 안 함)", async () => {
    const res = await request(app).get("/api/like");
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("로그인 후 이용 가능한 기능입니다.");
  });

  test("✅ 좋아요한 게시글 모두 불러오기 - 성공", async () => {
    const res = await request(app).get("/api/like").set("Cookie", likeToken);
    expect(res.status).toBe(200);
    expect(res.body.result.length).toBe(4);
  });

  afterAll(async () => {
    await prisma.users.deleteMany();
    await prisma.posts.deleteMany();
    await prisma.likes.deleteMany();
  });
});
