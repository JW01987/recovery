const UserRepository = require("../repositories/users.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
class UserService {
  userRepository = new UserRepository();

  register = async ({ password, nickname }) => {
    try {
      const isValidate = this.validateSignUp(nickname, password);
      //중복닉네임 확인
      const userFind = await this.userRepository.findByUnique(nickname);
      if (isValidate.success) {
        if (userFind === null) {
          //- 암호화-//
          const hashedPassword = await bcrypt.hash(password, 10);
          await this.userRepository.createUser({ nickname, hashedPassword });
          return { success: true };
        } else throw new Error("이미 존재하는 닉네임입니다");
      } else return res.status(412).json({ msg: isValidate.msg });
    } catch (error) {
      console.log("[Service] 회원가입 실패");
      throw new Error(error.message || "서비스에서 에러 발생");
    }
  };
  login = async ({ nickname, password }) => {
    try {
      const user = await this.userRepository.findByUnique(nickname);

      if (!user) throw new Error("존재하지 않는 닉네임입니다.");
      else if (!(await bcrypt.compare(password, user.password)))
        throw new Error("비밀번호가 일치하지 않습니다.");

      // 로그인에 성공하면, 사용자의 userId를 바탕으로 토큰을 생성합니다.
      const token = jwt.sign(
        {
          userId: user.id,
        },
        //- 시크릿키 설정하기-//
        process.env.KEY_USER
      );

      return { success: true, token };
    } catch (error) {
      console.log("[Service] 로그인 실패");
      throw new Error(error.message || "서비스에서 에러 발생");
    }
  };

  //-정규식-//
  validateSignUp = async (nickname, password) => {
    //-닉네임-//
    const nicknameRegex = /^[a-zA-Z0-9]{3,}$/;
    if (!nicknameRegex.test(nickname)) {
      throw new Error(
        "닉네임은 최소 3자 이상, 알파벳 대소문자와 숫자로만 구성되어야 합니다."
      );
    }

    //-비밀번호-//
    if (password.length < 4) {
      throw new Error("비밀번호는 최소 4자 이상이어야 합니다.");
    }
    if (password.includes(nickname)) {
      throw new Error("비밀번호에 닉네임과 같은 값이 포함될 수 없습니다.");
    }

    return true;
  };
}

module.exports = UserService;
