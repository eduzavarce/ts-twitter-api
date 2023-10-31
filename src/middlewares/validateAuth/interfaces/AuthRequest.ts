import { Request } from "express";

import { Auth } from "./Auth";

export interface AuthRequest extends Request {
	auth: Auth;
}
