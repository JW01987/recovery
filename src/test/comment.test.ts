import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../app.module";
import { PrismaService } from "../prisma/prisma.service";

describe("댓글 API 테스트 (E2E)", () => {
  jest.setTimeout(10000);
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    prisma = app.get(PrismaService);
  });

  describe("댓글 작성 테스트", () => {
    let token: string;
    let postId: number;
    beforeEach(async () => {
      await request(app.getHttpServer())
        .post("/api/register")
        .send({ nickname: "kim1", password: "@pass1234word@" });

      const res = await request(app.getHttpServer())
        .post("/api/login")
        .send({ nickname: "kim1", password: "@pass1234word@" });

      const rawCookie = res.headers["set-cookie"][0]; // 쿠키 값 가져오기
      const rawToken = rawCookie.split(";")[0];
      token = rawToken.replace("authorization=Bearer%20", "");

      const result = await request(app.getHttpServer())
        .post("/api/post")
        .set("Cookie", token)
        .send({ title: "kim의 게시물 1", content: "게시글 내용 1" });

      postId = result.body.postId;
    });

    test("❌ 댓글 작성 - 실패(내용 비어있음)", async () => {
      const res = await request(app.getHttpServer())
        .post("/api/comment")
        .set("Cookie", token)
        .send({ content: "  ", postId });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("내용을 입력해주세요");
    });

    test("❌ 댓글 작성 - 실패(로그인 안 함)", async () => {
      const res = await request(app.getHttpServer())
        .post("/api/comment")
        .send({ content: "테스트 댓글 다는 중", postId });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe("로그인 후 이용 가능한 기능입니다.");
    });

    test("✅ 댓글 작성 - 성공", async () => {
      const res = await request(app.getHttpServer())
        .post("/api/comment")
        .set("Cookie", token)
        .send({ content: "테스트 댓글 다는 중", postId });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe("댓글 등록 완료");
    });

    afterEach(async () => {
      await prisma.users.deleteMany();
      await prisma.posts.deleteMany();
      await prisma.comments.deleteMany();
    });
  });

  describe("댓글 불러오기 테스트", () => {
    let writerToken: string;
    let commentToken1: string;
    let commentToken2: string;
    let postId: number;
    beforeEach(async () => {
      async function makeToken({
        nickname,
        password,
      }: {
        nickname: string;
        password: string;
      }) {
        await request(app.getHttpServer())
          .post("/api/register")
          .send({ nickname, password });

        const res = await request(app.getHttpServer())
          .post("/api/login")
          .send({ nickname, password });

        const rawCookie = res.headers["set-cookie"][0]; // 쿠키 값 가져오기
        const rawToken = rawCookie.split(";")[0];
        return rawToken.replace("authorization=Bearer%20", "");
      }

      writerToken = await makeToken({
        nickname: "kim2",
        password: "pass@1234@word",
      });
      commentToken1 = await makeToken({
        nickname: "park1",
        password: "pass@5678@word",
      });
      commentToken2 = await makeToken({
        nickname: "lee1",
        password: "pass@91011@word",
      });

      const result = await request(app.getHttpServer())
        .post("/api/post")
        .set("Cookie", writerToken)
        .send({ title: "kim의 게시물 1", content: "게시글 내용 1" });

      postId = result.body.postId;

      async function makeComment(token: string, content: string) {
        await request(app.getHttpServer())
          .post("/api/comment")
          .set("Cookie", token)
          .send({ content, postId });
      }

      await makeComment(commentToken1, "테스트 댓글 1번");
      await makeComment(commentToken1, "테스트 댓글 2번");
      await makeComment(commentToken2, "테스트 댓글 3번");
      await makeComment(commentToken2, "테스트 댓글 4번");
    });

    test("❌ 댓글 불러오기 - 실패(로그인 안 함)", async () => {
      const res = await request(app.getHttpServer()).get("/api/comment");

      expect(res.status).toBe(401);
      expect(res.body.message).toBe("로그인 후 이용 가능한 기능입니다.");
    });

    test("✅ 댓글 불러오기 - 성공", async () => {
      const res = await request(app.getHttpServer())
        .get("/api/comment")
        .set("Cookie", commentToken1);

      expect(res.status).toBe(200);
      expect(res.body.result.length).toBe;
    });

    afterEach(async () => {
      await prisma.posts.deleteMany();
      await prisma.users.deleteMany();
      await prisma.comments.deleteMany();
    });
  });

  describe("댓글 삭제, 업데이트 테스트", () => {
    let postToken: string;
    let commentToken: string;
    let postId: number;
    let commentId: number;
    beforeEach(async () => {
      async function makeToken({
        nickname,
        password,
      }: {
        nickname: string;
        password: string;
      }) {
        await request(app.getHttpServer())
          .post("/api/register")
          .send({ nickname, password });

        const res = await request(app.getHttpServer())
          .post("/api/login")
          .send({ nickname, password });

        const rawCookie = res.headers["set-cookie"][0]; // 쿠키 값 가져오기
        const rawToken = rawCookie.split(";")[0];
        return rawToken.replace("authorization=Bearer%20", "");
      }

      postToken = await makeToken({
        nickname: "kim3",
        password: "pass@1234@word",
      });
      commentToken = await makeToken({
        nickname: "park2",
        password: "pass@5678@word",
      });

      const postResult = await request(app.getHttpServer())
        .post("/api/post")
        .set("Cookie", postToken)
        .send({ title: "kim의 게시물 1", content: "게시글 내용 1" });

      postId = postResult.body.postId;
      const commentResult = await request(app.getHttpServer())
        .post("/api/comment")
        .set("Cookie", commentToken)
        .send({ content: "테스트 댓글 다는 중", postId });

      commentId = commentResult.body.commentId;
    });

    test("❌ 댓글 업데이트 - 실패(로그인 안 함)", async () => {
      const res = await request(app.getHttpServer())
        .patch(`/api/comment/${commentId}`)
        .send({ content: "수정된 내용" });
      expect(res.status).toBe(401);
      expect(res.body.message).toBe("로그인 후 이용 가능한 기능입니다.");
    });

    test("✅ 댓글 업데이트 - 성공", async () => {
      const res = await request(app.getHttpServer())
        .patch(`/api/comment/${commentId}`)
        .set("Cookie", commentToken)
        .send({ content: "수정된 내용" });
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("댓글 수정 완료");
    });

    test("❌ 댓글 삭제 - 실패(로그인 안 함)", async () => {
      const res = await request(app.getHttpServer()).delete(
        `/api/comment/${commentId}`
      );
      expect(res.status).toBe(401);
      expect(res.body.message).toBe("로그인 후 이용 가능한 기능입니다.");
    });

    test("✅ 게시글 삭제 - 성공", async () => {
      const res = await request(app.getHttpServer())
        .delete(`/api/comment/${commentId}`)
        .set("Cookie", commentToken);
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("댓글 삭제 완료");
    });

    afterEach(async () => {
      await prisma.posts.deleteMany();
      await prisma.users.deleteMany();
      await prisma.comments.deleteMany();
    });
  });
  afterAll(async () => {
    await app.close();
  });
});
