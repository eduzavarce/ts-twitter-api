import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "../../users/repository/usersRepository";
import { throwError } from "../error/jsonError";
import { AuthRequest } from "./interfaces/AuthRequest";

export const validateAuth = (req: Request, _res: Response, next: NextFunction): void => {
	try {
		const { authorization } = req.headers as { authorization: string };
		if (!authorization) {
			throwError("Authorization header not found", 401);
		}
		const [bearer, accessToken] = authorization.split(" ");
		if (bearer !== "Bearer" || !accessToken) {
			throwError("Authorization header not found", 401);
		}
		const token = UsersRepository.verifyAccessToken(accessToken);
		req.auth = {
			uuid: token.uuid,
			username: token.username,
			avatar: token.avatar,
			expiresIn: token.expiresIn,
		} as AuthRequest["auth"];
		next();
	} catch (error) {
		next(error);
	}
};
