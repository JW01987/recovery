import cookieParser from "cookie-parser";
import express, { Request, Response } from "express"; // 타입 추가
import {
  postRouter,
  commentRouter,
  userRouter,
  likeRouter,
} from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";
const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use("/api", [postRouter, commentRouter, userRouter, likeRouter]);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

//if (process.env.TEST !== "true") {
app.listen(port, async () => {
  console.log("server started!");
});
// }

export default app;
