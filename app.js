const connect = require("./schemas");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const { postRouter, commentRouter, userRouter } = require("./routes");

connect();

app.use(express.json());
app.use(cookieParser());
app.use("/api", [postRouter, commentRouter, userRouter]);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
