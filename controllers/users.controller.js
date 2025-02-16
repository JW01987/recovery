const UserService = require("../services/users.service");

class UsersController {
  userService = new UserService();

  register = async (req, res, next) => {
    try {
      const { password, nickname } = req.body;
      const message = await this.userService.register({ password, nickname });
      res.status(200).json({ message });
    } catch (error) {
      console.error("[Controller] 회원가입 실패:", error);
      res.status(500).json({ message: error.message, success: false });
    }
  };

  login = async (req, res, next) => {
    try {
      const { nickname, password } = req.body;
      const { message, token } = await this.userService.login({
        nickname,
        password,
      });
      res.cookie("authorization", `Bearer ${token}`);
      res.status(200).json({ message });
    } catch (error) {
      console.error("[Controller] 로그인 실패:", error);
      res.status(500).json({ message: error.message, success: false });
    }
  };
}
module.exports = UsersController;
