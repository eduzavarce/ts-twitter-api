import { User } from "./user";

export interface CreateUserRequest extends User {
	repeat_password: string;
}
