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
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Response } from "express";
import { AuthRequest } from "../utils/authRequest";
import { PostDto } from "../dto/postDto";
import { Posts } from "@prisma/client";

@Controller("api")
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get("/postall")
  async getPostAll(@Res() res: Response) {
    try {
      const posts = await this.postService.getPostAll();
      res.status(200).json({ posts });
    } catch (error) {
      console.error("[Controller] 게시글 조회 실패");
      throw new HttpException("게시글 조회 실패", HttpStatus.UNAUTHORIZED);
    }
  }
  @Get("/post")
  async getPosts(@Req() req: AuthRequest, @Res() res: Response) {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const userId = req.user.id;
      const posts = await this.postService.getPosts({ userId });
      res.status(200).json({ posts });
    } catch (error) {
      console.error("[Controller] 게시글 조회 실패");
      throw new HttpException("게시글 조회 실패", HttpStatus.UNAUTHORIZED);
    }
  }
  @Patch("/post/:postId")
  async updatePost(
    @Body() body: PostDto,
    @Param() postId: number,
    @Res() res: Response,
    @Req() req: AuthRequest
  ) {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const userId = req.user.id;
      const { title, content } = body;

      await this.postService.updatePost({
        userId,
        title,
        content,
        postId,
      });
      res.status(200).json({ message: "게시글 수정성공" });
    } catch (error) {
      console.error("[Controller] 게시글 수정 실패");
      throw new HttpException("게시글 수정 실패", HttpStatus.UNAUTHORIZED);
    }
  }
  @Delete("/post/:postId")
  async deletePost(
    @Param() postId: number,
    @Res() res: Response,
    @Req() req: AuthRequest
  ) {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const userId = req.user.id;
      await this.postService.deletePost({ postId, userId });
      res.status(200).json({ message: "게시글 삭제 성공" });
    } catch (error) {
      console.error("[Controller] 게시글 삭제 실패");
      throw new HttpException("게시글 삭제 실패", HttpStatus.UNAUTHORIZED);
    }
  }
  @Post("/post")
  async createPost(
    @Body() body: PostDto,
    @Res() res: Response,
    @Req() req: AuthRequest
  ) {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const { title, content } = body;
      const userId = req.user.id;

      const result: Posts = await this.postService.createPost({
        title,
        content,
        userId,
      });

      res.status(200).json({ message: "게시글 등록 성공", postId: result.id });
    } catch (error) {
      console.error("[Controller] 게시글 등록 실패");
      throw new HttpException("게시글 등록 실패", HttpStatus.UNAUTHORIZED);
    }
  }
}
