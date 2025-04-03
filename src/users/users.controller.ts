import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpException,
  HttpStatus,
  Res,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDto } from "../dto/userDto";
import { Response } from "express";

@Controller("api")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post("/register")
  async register(@Body() userDto: UserDto, @Res() res: Response) {
    try {
      const { password, nickname } = userDto;
      await this.userService.register({
        nickname,
        password,
      });
      res.status(200).json({ message: "회원가입이 완료되었습니다" });
    } catch (error) {
      console.error("[Controller] 회원가입 실패");
      throw new HttpException("회원가입 실패", HttpStatus.BAD_REQUEST);
    }
  }

  @Get("/login")
  async login(@Body() userDto: UserDto, @Res() res: Response) {
    try {
      const { token } = await this.userService.login(userDto);
      res.cookie("authorization", `Bearer ${token}`);
      res.status(200).json({ message: "로그인이 완료되었습니다" });
    } catch (error) {
      console.error("[Controller] 로그인 실패", error);
      throw new HttpException("로그인 실패", HttpStatus.UNAUTHORIZED);
    }
  }
}
