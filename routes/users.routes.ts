import express, { Router } from "express";
import UsersController from "../controllers/users.controller";

const usersController = new UsersController();
const router: Router = express.Router();

router.get("/register", usersController.register);
router.patch("/login", usersController.login);

export default router;
