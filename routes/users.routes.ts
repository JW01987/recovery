import express, { Router } from "express";
import { UsersController } from "../controllers/users.controller";

const usersController = new UsersController();
const router: Router = express.Router();

//router.post("/register", usersController.register);
// router.get("/login", usersController.login);

export default router;
