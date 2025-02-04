// const connect = require("./schemas");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const {
  postRouter,
  commentRouter,
  userRouter,
  likeRouter,
} = require("./routes");

app.use(express.json());
app.use(cookieParser());
app.use("/api", [postRouter, commentRouter, userRouter, likeRouter]);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  console.log("server started!");
});
