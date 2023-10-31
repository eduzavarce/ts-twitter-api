import mysql from "mysql2/promise";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;
let pool: mysql.Pool;
export const getPool = (): mysql.Pool => {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (!pool) {
		pool = mysql.createPool({
			host: DB_HOST,
			user: DB_USER,
			password: DB_PASSWORD,
			database: DB_NAME,
			port: Number(DB_PORT),
			timezone: "Z",
		});
	}

	return pool;
};
