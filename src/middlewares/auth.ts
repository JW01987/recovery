import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from "@nestjs/common";
import { Request } from "express";
import { PrismaService } from "../prisma/prisma.service";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers.cookie;

    if (!token) {
      throw new HttpException("로그인 후 이용 가능한 기능입니다.", 401);
    }

    // const [type, token] = authorization.split(" ");
    // if (type !== "Bearer") {
    //   throw new HttpException("토큰 타입이 일치하지 않습니다.", 401);
    // }

    try {
      const decoded = jwt.verify(token, process.env.KEY_USER as string) as {
        userId: number;
      };
      const user = await this.prisma.users.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw new HttpException("사용자가 존재하지 않습니다.", 400);
      }

      (req as any).user = user;
      return true;
    } catch (err) {
      throw new HttpException("인증 실패", 401);
    }
  }
}
