import { NextFunction, Response } from "express";

import { AuthRequest } from "../../middlewares/validateAuth/interfaces/AuthRequest";

export const postTweetController = async (req: AuthRequest, res: Response, next: NextFunction) => {
	try {
		res.send("hello world");
	} catch (error) {
		next(error);
	}
};
