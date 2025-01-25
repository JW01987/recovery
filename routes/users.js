const User = require("../schemas/user");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

//- 회원가입 -//
router.post("/register", async (req, res) => {
  const { password, nickname } = req.body;
  const isExistUser = await User.find({ nickname });

  if (isExistUser.length) {
    return res.status(409).json({ message: "이미 존재하는 닉네임입니다." });
  }
  const isValidate = validateSignUp(nickname, password);

  if (isValidate.success) {
    //- 암호화-//
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ nickname, password: hashedPassword });

    return res.status(201).json({ message: "회원가입이 완료되었습니다." });
  }

  return res.status(412).json({ message: isValidate.message });
});

//- 로그인-//
router.post("/login", async (req, res) => {
  const { nickname, password } = req.body;
  const user = await User.findOne({ nickname });

  console.log(user);

  if (!user)
    return res.status(401).json({ message: "존재하지 않는 닉네임입니다." });
  else if (!(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });

  // 로그인에 성공하면, 사용자의 userId를 바탕으로 토큰을 생성합니다.
  const token = jwt.sign(
    {
      userId: user.id,
    },
    //- 시크릿키 설정하기-//
    "customized_secret_key"
  );

  res.cookie("authorization", `Bearer ${token}`);
  return res.status(200).json({ message: "로그인 성공" });
});

//-정규식-//
function validateSignUp(nickname, password) {
  //-닉네임-//
  const nicknameRegex = /^[a-zA-Z0-9]{3,}$/;
  if (!nicknameRegex.test(nickname)) {
    return {
      success: false,
      message:
        "닉네임은 최소 3자 이상, 알파벳 대소문자와 숫자로만 구성되어야 합니다.",
    };
  }

  //-비밀번호-//
  if (password.length < 4) {
    return {
      success: false,
      message: "비밀번호는 최소 4자 이상이어야 합니다.",
    };
  }
  if (password.includes(nickname)) {
    return {
      success: false,
      message: "비밀번호에 닉네임과 같은 값이 포함될 수 없습니다.",
    };
  }

  return {
    success: true,
    message: "회원가입이 성공적으로 완료되었습니다.",
  };
}

module.exports = router;
