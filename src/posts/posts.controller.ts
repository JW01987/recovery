import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Req,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { AuthRequest } from "../utils/authRequest";
import { PostDto } from "../dto/postDto";
import { Posts } from "@prisma/client";
import { AuthGuard } from "../middlewares/auth";

@Controller("api")
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get("/postall")
  async getPostAll() {
    try {
      const posts = await this.postService.getPostAll();
      return { posts };
    } catch (error) {
      console.error("[Controller] 게시글 조회 실패");
      throw error;
    }
  }
  @Get("/post")
  @UseGuards(AuthGuard)
  async getPosts(@Req() req: AuthRequest) {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const userId = req.user.id;
      const posts = await this.postService.getPosts({ userId });
      return { posts };
    } catch (error) {
      console.error("[Controller] 게시글 조회 실패");
      throw error;
    }
  }
  @Patch("/post/:postId")
  @UseGuards(AuthGuard)
  async updatePost(
    @Body() body: PostDto,
    @Param("postId", ParseIntPipe) postId: number,
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
      return { message: "게시글 수정성공" };
    } catch (error) {
      console.error("[Controller] 게시글 수정 실패");
      throw error;
    }
  }
  @Delete("/post/:postId")
  @UseGuards(AuthGuard)
  async deletePost(
    @Param("postId", ParseIntPipe) postId: number,
    @Req() req: AuthRequest
  ) {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const userId = req.user.id;
      await this.postService.deletePost({ postId, userId });
      return { message: "게시글 삭제 성공" };
    } catch (error) {
      console.error("[Controller] 게시글 삭제 실패");
      throw error;
    }
  }
  @Post("/post")
  @UseGuards(AuthGuard)
  async createPost(@Body() body: PostDto, @Req() req: AuthRequest) {
    try {
      if (req.user == undefined) throw Error("로그인 후 이용해주세요");
      const { title, content } = body;
      const userId = req.user.id;

      const result: Posts = await this.postService.createPost({
        title,
        content,
        userId,
      });

      return { message: "게시글 등록 성공", postId: result.id };
    } catch (error) {
      console.error("[Controller] 게시글 등록 실패");
      throw error;
    }
  }
}
