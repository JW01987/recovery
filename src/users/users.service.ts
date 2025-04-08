import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserDto } from "../dto/userDto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();
import { AppError } from "../utils/error";
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async register({ nickname, password }: UserDto) {
    await this.validateSignUp(nickname, password);
    //중복닉네임 확인
    const userFind = await this.prisma.users.findUnique({
      where: { nickname },
    });

    if (userFind === null) {
      //- 암호화-//
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.prisma.users.create({
        data: { nickname, password: hashedPassword },
      });
    } else throw new AppError("이미 존재하는 닉네임입니다", 400);
  }

  async login({ nickname, password }: UserDto) {
    const user = await this.prisma.users.findUnique({
      where: { nickname },
    });

    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new AppError("닉네임 또는 비밀번호가 잘못되었습니다", 400);

    // 로그인에 성공하면, 사용자의 userId를 바탕으로 토큰을 생성합니다.
    const token = jwt.sign(
      {
        userId: user.id,
      },
      //- 시크릿키 설정하기-//
      process.env.KEY_USER!
    );

    return { token };
  }
  //-정규식-//
  validateSignUp = async (nickname: string, password: string) => {
    //-닉네임-//
    const nicknameRegex = /^[a-zA-Z0-9]{3,}$/;
    if (!nicknameRegex.test(nickname)) {
      throw new AppError(
        "닉네임은 최소 3자 이상, 알파벳 대소문자와 숫자로만 구성되어야 합니다.",
        400
      );
    }

    //-비밀번호-//
    if (password.length < 4) {
      throw new AppError("비밀번호는 최소 4자 이상이어야 합니다.", 400);
    }
    if (password.includes(nickname)) {
      throw new AppError(
        "비밀번호에 닉네임과 같은 값이 포함될 수 없습니다.",
        400
      );
    }

    return true;
  };
}
