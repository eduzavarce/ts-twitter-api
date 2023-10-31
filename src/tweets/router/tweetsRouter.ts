import express from "express";

import { AuthRequestHandler } from "../../middlewares/validateAuth/interfaces/AuthRequestHandler";
import { validateAuth } from "../../middlewares/validateAuth/validateAuth";
import { postTweetController } from "../controllers/postTweetController";

export const tweetsRouter = express.Router();

tweetsRouter
	.route("/")
	.get(() => {})
	.all(validateAuth as AuthRequestHandler)
	.post(postTweetController as AuthRequestHandler);
