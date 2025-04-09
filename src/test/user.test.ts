import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../app.module";
import { PrismaService } from "../prisma/prisma.service";

describe("회원가입 및 로그인 API 테스트 (E2E)", () => {
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

  describe("회원가입 테스트", () => {
    beforeEach(async () => {
      await request(app.getHttpServer())
        .post("/api/register")
        .send({ nickname: "nick", password: "@pass1234word@" });
    });

    test("❌ 회원가입 - 실패(중복 닉네임)", async () => {
      const res = await request(app.getHttpServer())
        .post("/api/register")
        .send({ nickname: "nick", password: "@pass1234word@" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("이미 존재하는 닉네임입니다");
    });

    test("❌ 회원가입 - 실패(닉네임 조건 미달)", async () => {
      const res = await request(app.getHttpServer())
        .post("/api/register")
        .send({ nickname: "e", password: "@pass1234word@" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "닉네임은 최소 3자 이상, 알파벳 대소문자와 숫자로만 구성되어야 합니다."
      );
    });

    test("❌ 회원가입 - 실패(비밀번호 조건 미달:4자 이상)", async () => {
      const res = await request(app.getHttpServer())
        .post("/api/register")
        .send({ nickname: "kim15", password: "e" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("비밀번호는 최소 4자 이상이어야 합니다.");
    });

    test("❌ 회원가입 - 실패(비밀번호 조건 미달:닉네임과 같은 값 포함)", async () => {
      const res = await request(app.getHttpServer())
        .post("/api/register")
        .send({ nickname: "kim", password: "kim000" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "비밀번호에 닉네임과 같은 값이 포함될 수 없습니다."
      );
    });

    test("✅ 회원가입 -  성공", async () => {
      const res = await request(app.getHttpServer())
        .post("/api/register")
        .send({ nickname: "kim16", password: "@pass1234word@" });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe("회원가입이 완료되었습니다");
    });

    afterEach(async () => {
      await prisma.users.deleteMany();
    });
  });

  describe("로그인 테스트", () => {
    beforeEach(async () => {
      await request(app.getHttpServer())
        .post("/api/register")
        .send({ nickname: "kim17", password: "@pass1234word@" });
    });

    test("❌ 로그인 - 실패(닉네임 오류)", async () => {
      const res = await request(app.getHttpServer())
        .post("/api/login")
        .send({ nickname: "empty", password: "@pass1234word@" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("닉네임 또는 비밀번호가 잘못되었습니다");
    });

    test("❌ 로그인 - 실패(비밀번호 오류)", async () => {
      const res = await request(app.getHttpServer())
        .post("/api/login")
        .send({ nickname: "kim17", password: "empty" });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("닉네임 또는 비밀번호가 잘못되었습니다");
    });

    test("✅ 로그인 - 성공", async () => {
      const res = await request(app.getHttpServer())
        .post("/api/login")
        .send({ nickname: "kim17", password: "@pass1234word@" });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe("로그인이 완료되었습니다");
      expect(res.headers["set-cookie"]).toBeDefined();
    });

    afterEach(async () => {
      await prisma.users.deleteMany();
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
