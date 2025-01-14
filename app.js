const connect = require("./schemas");
const express = require("express");
const app = express();
const port = 3000;
const { postRouter } = require("./routes");

connect();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});

app.use("/api", [postRouter]);
