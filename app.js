// const connect = require("./schemas");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const { sequelize } = require("./models");
const { postRouter, commentRouter, userRouter } = require("./routes");

app.use(express.json());
app.use(cookieParser());
app.use("/api", [postRouter, commentRouter, userRouter]);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  console.log("server started!");
  await sequelize.authenticate();
  console.log("db authenticated!");
});
