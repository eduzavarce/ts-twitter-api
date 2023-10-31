import { NextFunction, Request, Response } from "express";

import { throwError } from "../../middlewares/error/jsonError";
import { SendResponse } from "../../shared/interfaces/SendResponse";
import { LoginResponseMessage } from "../interfaces/LoginResponseMessage";
import { UsersRepository } from "../repository/usersRepository";
import { loginUserSchema } from "../schemas/loginUserSchema";

interface RequestBody {
	email: string;
	password: string;
}

export const loginUserController = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const userRequest = req.body as RequestBody;
		await loginUserSchema.validateAsync(userRequest);

		const user = await UsersRepository.findByEmail(userRequest.email);
		if (!user.uuid) {
			throwError("Email or password not found", 400);
		}

		const isPasswordValid = await UsersRepository.comparePassword(
			userRequest.password,
			user.password,
		);
		if (!isPasswordValid) {
			throwError("Email or password not found", 400);
		}
		const accessToken = UsersRepository.createAccessToken(user);

		const response: SendResponse = {
			status: "ok",
			message: {
				accessToken,
			} as LoginResponseMessage,
		};

		res.status(200).send(response);
	} catch (error) {
		next(error);
	}
};
