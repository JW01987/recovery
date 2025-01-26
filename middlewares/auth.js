const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.cookies;

    if (!authorization)
      return res
        .status(401)
        .send({ message: "로그인 후 이용 가능한 기능입니다." });

    const [tokenType, token] = authorization.split(" ");
    //- 토큰 타입 확인-//
    if (tokenType !== "Bearer")
      return res
        .status(401)
        .send({ message: "토큰 타입이 일치하지 않습니다." });

    //-시크릿 키 설정하기-//
    const decodedToken = jwt.verify(token, "customized_secret_key");
    const userId = decodedToken.userId;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      res.clearCookie("authorization");
      return res.status(401).send({ message: "사용자가 존재하지 않습니다." });
    }

    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("authorization");
    return res.send({ message: "오류가 발생했습니다" });
  }
};
