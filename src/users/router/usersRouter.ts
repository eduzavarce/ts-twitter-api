import express, { RequestHandler } from "express";

import { createUserController } from "../controllers/createUserController";
import { loginUserController } from "../controllers/loginUserController";

export const usersRouter = express.Router();
usersRouter.post("/", createUserController as RequestHandler);
usersRouter.post("/login", loginUserController as RequestHandler);
