import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Response, NextFunction, RequestHandler } from "express";
import { AuthRequest } from "../utils/authRequest";
import { AppError } from "../utils/error";
const prisma = new PrismaClient();
require("dotenv").config();

export const authMiddleware: RequestHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { authorization } = req.cookies;

    if (!authorization) {
      next(new AppError("로그인 후 이용 가능한 기능입니다.", 401));
      return;
    }

    const [tokenType, token] = authorization.split(" ");
    //- 토큰 타입 확인-//
    if (tokenType !== "Bearer") {
      next(new AppError("토큰 타입이 일치하지 않습니다.", 400));
      return;
    }

    //-시크릿 키 설정하기-//
    const decodedToken = jwt.verify(token, process.env.KEY_USER as string) as {
      userId: number;
    };
    const userId = decodedToken.userId;
    const user = await prisma.users.findUnique({ where: { id: userId } });

    if (!user) {
      res.clearCookie("authorization");
      next(new AppError("사용자가 존재하지 않습니다.", 401));
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("authorization");
    next(new Error("오류가 발생했습니다"));
    return;
  }
};
