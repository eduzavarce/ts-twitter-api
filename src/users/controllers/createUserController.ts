import { NextFunction, Request, Response } from "express";

import { CreateUserRequest } from "../interfaces/createUserRequest";
import { User } from "../interfaces/user";
import { UsersRepository } from "../repository/usersRepository";
import { createNewUserSchema } from "../schemas/createNewUserSchema";

export const createUserController = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const {
		uuid,
		username,
		email,
		password,
		repeat_password: repeatPassword,
	} = req.body as CreateUserRequest;

	try {
		await createNewUserSchema.validateAsync({ uuid, username, email, password, repeatPassword });

		const user: User = {
			uuid,
			username,
			email,
			password,
		};
		user.password = await UsersRepository.createHashPassword(password);
		await UsersRepository.register(user);

		res.sendStatus(201);
	} catch (error) {
		next(error);

		return;
	}
};
