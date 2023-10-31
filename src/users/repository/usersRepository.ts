import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ResultSetHeader, RowDataPacket } from "mysql2";

import { getPool } from "../../infrastructure/database/getPool";
import { Auth } from "../../middlewares/validateAuth/interfaces/Auth";
import { User, UserDetails } from "../interfaces/user";

export class UsersRepository {
	static async register(user: User): Promise<number> {
		const pool = getPool();
		const [result] = await pool.query<ResultSetHeader>(
			`INSERT INTO users ( uuid, username, email, password )
       VALUES ( ?, ?, ?, ? )`,
			[user.uuid, user.username, user.email, user.password],
		);

		return result.insertId;
	}

	static async findByEmail(email: string): Promise<UserDetails> {
		const pool = getPool();
		const [users] = await pool.query<RowDataPacket[]>(
			`SELECT uuid, username, email, password FROM users WHERE email = ?`,
			[email],
		);

		return {
			uuid: String(users[0]?.uuid),
			username: String(users[0]?.username),
			email: String(users[0]?.email),
			password: String(users[0]?.password),
			avatar: new URL(`http://localhost.com/users/${String(users[0]?.avatar)}`),
			bio: String(users[0]?.bio),
			createAt: new Date(Number(users[0]?.createAt)),
		};
	}

	static async createHashPassword(password: string): Promise<string> {
		const salt: string = await bcrypt.genSalt(10);

		return await bcrypt.hash(password, salt);
	}

	static async comparePassword(password: string, hashPassword: string): Promise<boolean> {
		return bcrypt.compare(password, hashPassword);
	}

	static createAccessToken(user: UserDetails): string {
		const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
		const payload: Auth = {
			uuid: user.uuid,
			username: user.username,
			avatar: user.avatar,
			expiresIn: JWT_EXPIRES_IN,
		};

		return jwt.sign(payload, String(JWT_SECRET));
	}

	static verifyAccessToken(token: string): Auth {
		const { JWT_SECRET } = process.env;

		return jwt.verify(token, String(JWT_SECRET)) as Auth;
	}
}
