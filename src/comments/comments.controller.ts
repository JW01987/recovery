import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  HttpException,
  HttpStatus,
  Res,
  Req,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import { Response } from "express";
import { AuthRequest } from "../utils/authRequest";
import { Comments } from "@prisma/client";
import { CommentsService } from "./comments.service";
import { CommentDto } from "../dto/commentDto";
import { AuthGuard } from "../middlewares/auth";

@Controller("api")
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get("/comment")
  @UseGuards(AuthGuard)
  async commentList(@Req() req: AuthRequest) {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const userId = req.user.id;
      const result = await this.commentService.getList(userId);
      return { result };
    } catch (error) {
      console.error("[Controller] 댓글 불러오기 실패");
      throw error;
    }
  }

  @Patch("/comment/:commentId")
  @UseGuards(AuthGuard)
  async commentUpdate(
    @Req() req: AuthRequest,
    @Body("content") content: string,
    @Param("commentId", ParseIntPipe) commentId: number
  ) {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const userId = req.user.id;
      await this.commentService.commentUpdate({
        commentId,
        content,
        userId,
      });

      return { message: "댓글 수정 완료" };
    } catch (error) {
      console.error("[Controller] 댓글 수정 실패");
      throw error;
    }
  }

  @Delete("/comment/:commentId")
  @UseGuards(AuthGuard)
  async commentDelete(
    @Req() req: AuthRequest,
    @Param("commentId", ParseIntPipe) commentId: number
  ) {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const userId = req.user.id;
      await this.commentService.commentDelete({
        commentId,
        userId,
      });

      return { message: "댓글 삭제 완료" };
    } catch (error) {
      console.error("[Controller] 댓글 삭제 실패");
      throw error;
    }
  }
  @Post("comment")
  @UseGuards(AuthGuard)
  async commentCreate(@Req() req: AuthRequest, @Body() body: CommentDto) {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const { content, postId } = body;
      const userId = req.user.id;
      const result: Comments = await this.commentService.commentCreate({
        content,
        postId,
        userId,
      });

      return { message: "댓글 등록 완료", commentId: result.id };
    } catch (error) {
      console.error("[Controller] 댓글 작성 실패");
      throw error;
    }
  }
}
