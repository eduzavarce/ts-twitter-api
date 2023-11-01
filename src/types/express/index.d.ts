import { Auth } from "../../middlewares/validateAuth/interfaces/Auth";

export {};

declare global {
	namespace Express {
		export interface Request {
			auth?: Auth;
		}
	}
}
