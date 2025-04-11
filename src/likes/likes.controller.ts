import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Put,
  HttpException,
  HttpStatus,
  Res,
  Req,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import { Response } from "express";
import { AuthRequest } from "../utils/authRequest";
import { LikesService } from "./likes.service";
import { AuthGuard } from "../middlewares/auth";

@Controller("api")
export class LikesController {
  constructor(private readonly likeServices: LikesService) {}

  @Post("/like/:postId")
  @UseGuards(AuthGuard)
  async like(
    @Req() req: AuthRequest,
    @Param("postId", ParseIntPipe) postId: number
  ) {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const userId = req.user.id;
      const like: boolean = await this.likeServices.like({ userId, postId });
      if (like) {
        return { message: "좋아요를 등록했습니다" };
      } else {
        return { message: "좋아요를 취소했습니다" };
      }
    } catch (error) {
      console.error("[Controller] 좋아요 등록 실패");
      throw error;
    }
  }

  @Get("/like")
  @UseGuards(AuthGuard)
  async likeGet(@Req() req: AuthRequest) {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const userId = req.user.id;
      const { result } = await this.likeServices.likeGet(userId);
      return { result };
    } catch (error) {
      console.error("[Controller] 좋아요 게시글 불러오기 실패");
      throw error;
    }
  }
}
