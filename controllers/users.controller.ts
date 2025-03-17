import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../utils/authRequest";
import { UserService } from "../services/users.service";
import { UserDto } from "../utils/dtos/userDto";

export class UsersController {
  userService = new UserService();

  register = async (
    req: AuthRequest<{}, {}, UserDto>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { password, nickname } = req.body;
      await this.userService.register({
        nickname,
        password,
      });
      return res.status(200).json({ message: "회원가입이 완료되었습니다" });
    } catch (error) {
      console.error("[Controller] 회원가입 실패:", error);
      next(error);
    }
  };

  login = async (
    req: AuthRequest<{}, {}, UserDto>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { nickname, password } = req.body;
      const { token } = await this.userService.login({
        nickname,
        password,
      });

      res.cookie("authorization", `Bearer ${token}`);
      return res.status(200).json({ message: "로그인이 완료되었습니다" });
    } catch (error) {
      console.error("[Controller] 로그인 실패:", error);
      next(error);
    }
  };
}
module.exports = UsersController;
