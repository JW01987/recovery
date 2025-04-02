import request from "supertest";
import app from "../app";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

describe("게시글 작성 테스트", () => {
  let token: string;
  beforeAll(async () => {
    await request(app)
      .post("/api/register")
      .send({ nickname: "kim10", password: "@pass1234word@" });

    const res = await request(app)
      .get("/api/login")
      .send({ nickname: "kim10", password: "@pass1234word@" });

    const rawCookie = res.headers["set-cookie"][0]; // 쿠키 값 가져오기
    token = rawCookie.split(";")[0];
  });

  test("❌ 게시글 작성 - 실패(내용 비어있음)", async () => {
    const res = await request(app)
      .post("/api/post")
      .set("Cookie", token)
      .send({ title: "", content: "게시글 내용 1" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("제목과 내용은 비워둘 수 없습니다");
  });

  test("❌ 게시글 작성 - 실패(내용 비어있음)", async () => {
    const res = await request(app)
      .post("/api/post")
      .set("Cookie", token)
      .send({ title: "kim의 게시물", content: "" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("제목과 내용은 비워둘 수 없습니다");
  });

  test("✅  게시글 작성 - 성공", async () => {
    const res = await request(app)
      .post("/api/post")
      .set("Cookie", token)
      .send({ title: "kim의 게시물", content: "게시글 내용 1" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("게시글 등록 성공");
  });

  afterAll(async () => {
    await prisma.users.deleteMany();
    await prisma.posts.deleteMany();
  });
});

describe("게시글 불러오기 테스트", () => {
  let token1: string;
  let token2: string;
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

    token1 = await makeToken({
      nickname: "kim11",
      password: "pass@1234@word",
    });
    token2 = await makeToken({
      nickname: "kim12",
      password: "pass@1234@word",
    });

    async function makePost(token: string, title: string, content: string) {
      const result = await request(app)
        .post("/api/post")
        .set("Cookie", token)
        .send({ title, content });
    }

    await makePost(token1, "kim1의 게시글 1", "내용1");
    await makePost(token1, "kim1의 게시글 2", "내용2");
    await makePost(token1, "kim1의 게시글 3", "내용3");
    await makePost(token2, "kim2의 게시글 1", "내용1");
    await makePost(token2, "kim2의 게시글 2", "내용2");
  });

  test("✅ 게시글 모두 불러오기 - 성공", async () => {
    const res = await request(app).get("/api/postall");
    expect(res.status).toBe(200);
    expect(res.body.posts.length).toBe(5);
  });

  test("❌ 내 게시글 불러오기 - 실패(로그인 안 함)", async () => {
    const res = await request(app).get("/api/post");
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("로그인 후 이용 가능한 기능입니다.");
  });

  test("✅ 내 게시글 불러오기 - 성공", async () => {
    const res = await request(app).get("/api/post").set("Cookie", token1);
    expect(res.status).toBe(200);
    expect(res.body.posts.length).toBe(3);
  });

  afterAll(async () => {
    await prisma.users.deleteMany();
    await prisma.posts.deleteMany();
  });
});

describe("게시글 삭제, 업데이트 테스트", () => {
  let token: string;
  let postId: number;
  beforeAll(async () => {
    await request(app)
      .post("/api/register")
      .send({ nickname: "kim13", password: "@pass1234word@" });

    const res = await request(app)
      .get("/api/login")
      .send({ nickname: "kim13", password: "@pass1234word@" });

    const rawCookie = res.headers["set-cookie"][0];
    token = rawCookie.split(";")[0];

    const result = await request(app)
      .post("/api/post")
      .set("Cookie", token)
      .send({ title: "kim의 게시물 1", content: "게시글 내용 1" });

    postId = result.body.postId;
  });

  test("❌ 게시글 업데이트 - 실패(로그인 안 함)", async () => {
    const res = await request(app)
      .patch(`/api/post/${postId}`)
      .send({ title: "수정된 제목", content: "수정된 내용" });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("로그인 후 이용 가능한 기능입니다.");
  });

  test("✅ 게시글 업데이트 - 성공", async () => {
    const res = await request(app)
      .patch(`/api/post/${postId}`)
      .set("Cookie", token)
      .send({ title: "수정된 제목", content: "수정된 내용" });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("게시글 수정성공");
  });

  test("❌ 게시글 삭제 - 실패(로그인 안 함)", async () => {
    const res = await request(app).delete(`/api/post/${postId}`);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("로그인 후 이용 가능한 기능입니다.");
  });

  test("✅ 게시글 삭제 - 성공", async () => {
    const res = await request(app)
      .delete(`/api/post/${postId}`)
      .set("Cookie", token);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("게시글 삭제 성공");
  });

  afterAll(async () => {
    await prisma.posts.deleteMany();
    await prisma.users.deleteMany();
  });
});
