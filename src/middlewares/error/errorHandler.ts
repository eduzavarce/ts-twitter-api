import { NextFunction, Request, Response } from "express";

import { SendResponse } from "../../shared/interfaces/SendResponse";
import { JsonError } from "./jsonError";

export const errorHandler = (
	error: JsonError,
	_req: Request,
	res: Response,
	_next: NextFunction,
): void => {
	const { message, code } = error;
	console.error(error);

	const response: SendResponse = {
		status: "error",
		message: message || "Something went wrong",
	};
	console.error("response: ", response);
	res.status(code ?? 500).send(response);
};
