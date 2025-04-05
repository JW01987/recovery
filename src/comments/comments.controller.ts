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
} from "@nestjs/common";
import { Response } from "express";
import { AuthRequest } from "../../utils/authRequest";
import { Comments, Posts } from "@prisma/client";
import { CommentsService } from "./comments.service";
import { CommentCreateDto, CommentDto } from "../dto/commentDto";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get("/comment")
  async commentList(@Req() req: AuthRequest, @Res() res: Response) {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const userId = req.user.id;
      const result = await this.commentService.getList(userId);
      res.status(200).json({ result });
    } catch (error) {
      console.error("[Controller] 댓글 불러오기 실패");
      throw new HttpException("댓글 불러오기 실패", HttpStatus.UNAUTHORIZED);
    }
  }

  @Patch("/comment/:commentId")
  async commentUpdate(
    @Req() req: AuthRequest,
    @Res() res: Response,
    @Body() content: string,
    @Param() commentId: number
  ) {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const userId = req.user.id;
      await this.commentService.commentUpdate({
        commentId,
        content,
        userId,
      });

      res.status(200).json({ message: "댓글 수정 완료" });
    } catch (error) {
      console.error("[Controller] 댓글 수정 실패");
      throw new HttpException("댓글 수정 실패", HttpStatus.UNAUTHORIZED);
    }
  }

  @Delete("/comment/:commentId")
  async commentDelete(
    @Req() req: AuthRequest,
    @Res() res: Response,
    @Param() commentId: number
  ) {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const userId = req.user.id;
      await this.commentService.commentDelete({
        commentId,
        userId,
      });

      res.status(200).json({ message: "댓글 삭제 완료" });
    } catch (error) {
      console.error("[Controller] 댓글 삭제 실패");
      throw new HttpException("댓글 삭제 실패", HttpStatus.UNAUTHORIZED);
    }
  }
  @Post("comment")
  async commentCreate(
    @Req() req: AuthRequest,
    @Res() res: Response,
    @Body() body: CommentDto
  ) {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const { content, postId } = body;
      const userId = req.user.id;
      const result: Comments = await this.commentService.commentCreate({
        content,
        postId,
        userId,
      });

      res.status(200).json({ message: "댓글 등록 완료", commentId: result.id });
    } catch (error) {
      console.error("[Controller] 댓글 작성 실패");
      throw new HttpException("댓글 작성 실패", HttpStatus.UNAUTHORIZED);
    }
  }
}
