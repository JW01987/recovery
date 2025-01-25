const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

module.exports = async (req, res) => {
  try {
    const { authorization } = req.cookies;
    if (!authorization)
      res.status(401).send({ message: "로그인 후 이용 가능한 기능입니다." });
    console.log(authorization, "이거 쿠키");
    const [tokenType, token] = authorization.split(" ");

    if (tokenType !== "Bearer")
      res.status(401).send({ message: "토큰 타입이 일치하지 않습니다." });

    const decodedToken = jwt.verify(token, "customized_secret_key");
    const userId = decodedToken.userId;

    const user = await User.find({ id: userId });
    console.log(user, "유저");
    if (!user) {
      res.clearCookie("authorization");
      res.status(401).send({ message: "사용자가 존재하지 않습니다." });
    }

    // req.user에 사용자 정보를 저장합니다.
    req.user = user;

    next();
  } catch (err) {
    res.clearCookie("authorization");
    res.send({ message: "오류가 발생했습니다" });
  }
};
