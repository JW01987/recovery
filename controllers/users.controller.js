const UserService = require("../services/users.service");

class UsersController {
  userService = new UserService();

  register = async (req, res, next) => {
    try {
      const { password, nickname } = req.body;
      const { success } = await this.userService.register({
        password,
        nickname,
      });
      if (success) {
        return res.status(200).json({ message: "회원가입이 완료되었습니다" });
      }
      return res.status(200).json({ message: "회원가입 실패" });
    } catch (error) {
      console.error("[Controller] 회원가입 실패:", error);
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { nickname, password } = req.body;
      const { success, token } = await this.userService.login({
        nickname,
        password,
      });
      if (success) {
        res.cookie("authorization", `Bearer ${token}`);
        return res.status(200).json({ message: "로그인이 완료되었습니다" });
      }
      return res.status(200).json({ message: "로그인 실패" });
    } catch (error) {
      console.error("[Controller] 로그인 실패:", error);
      next(error);
    }
  };
}
module.exports = UsersController;
