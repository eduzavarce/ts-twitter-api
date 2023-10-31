import { RequestHandler } from "express";

import { AuthRequest } from "./AuthRequest";

export interface AuthRequestHandler extends RequestHandler {
	Request: AuthRequest;
}
