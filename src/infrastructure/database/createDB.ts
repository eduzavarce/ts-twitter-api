import "dotenv/config";

import mysql from "mysql2/promise";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;
let pool: mysql.Pool;
const getPool = (): mysql.Pool => {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (!pool) {
		pool = mysql.createPool({
			host: DB_HOST,
			user: DB_USER,
			password: DB_PASSWORD,
			port: Number(DB_PORT),
			timezone: "Z",
		});
	}

	return pool;
};

/*eslint-disable no-console */
const createDB = async () => {
	const pool = getPool();
	console.log("Creating database...");
	console.log(DB_NAME);
	await pool.query(`CREATE SCHEMA IF NOT EXISTS \`${DB_NAME}\`;`);
	await pool.query(`USE \`${DB_NAME}\`;`);
	console.log("Creating tables...");
	await pool.query(`DROP TABLE IF EXISTS comments;`);
	await pool.query(`DROP TABLE IF EXISTS retweets;`);
	await pool.query(`DROP TABLE IF EXISTS follows;`);
	await pool.query(`DROP TABLE IF EXISTS likes;`);
	await pool.query(`DROP TABLE IF EXISTS tweets;`);
	await pool.query(`DROP TABLE IF EXISTS users;`);
	await pool.query(`
		CREATE TABLE IF NOT EXISTS users (
			id INT NOT NULL AUTO_INCREMENT,
			uuid VARCHAR(255) NOT NULL UNIQUE,
			name VARCHAR(255) NOT NULL,
			email VARCHAR(255) NOT NULL,
			password VARCHAR(255) NOT NULL,
			avatar VARCHAR(255) NOT NULL,
			bio VARCHAR(255) NOT NULL,
			created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			PRIMARY KEY (id),
			UNIQUE KEY email (email)
		);
	`);
	await pool.query(`
		CREATE TABLE IF NOT EXISTS tweets (
			id INT NOT NULL AUTO_INCREMENT,
			uuid VARCHAR(255) NOT NULL UNIQUE,
			user_id VARCHAR(255) NOT NULL,
			content TEXT NOT NULL,
			created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			PRIMARY KEY (id),
			FOREIGN KEY (user_id) REFERENCES users(uuid)
		);
	`);
	await pool.query(`
		CREATE TABLE IF NOT EXISTS likes (
			id INT NOT NULL AUTO_INCREMENT,
			uuid VARCHAR(255) NOT NULL UNIQUE,
			user_id VARCHAR(255) NOT NULL,
			tweet_id VARCHAR(255) NOT NULL,
			created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			PRIMARY KEY (id),
			FOREIGN KEY (user_id) REFERENCES users(uuid),
			FOREIGN KEY (tweet_id) REFERENCES tweets(uuid)
		);
	`);
	await pool.query(`
		CREATE TABLE IF NOT EXISTS follows (
			id INT NOT NULL AUTO_INCREMENT,
			uuid VARCHAR(255) NOT NULL UNIQUE,
			follower_id VARCHAR(255) NOT NULL,
			followed_id VARCHAR(255) NOT NULL,
			created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			PRIMARY KEY (id),
			FOREIGN KEY (follower_id) REFERENCES users(uuid),
			FOREIGN KEY (followed_id) REFERENCES users(uuid)
		);
	`);
	await pool.query(`
		CREATE TABLE IF NOT EXISTS retweets (
			id INT NOT NULL AUTO_INCREMENT,
			uuid VARCHAR(255) NOT NULL UNIQUE,
			user_id VARCHAR(255) NOT NULL,
			tweet_id VARCHAR(255) NOT NULL,
			content TEXT NOT NULL,
			created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			PRIMARY KEY (id),
			FOREIGN KEY (user_id) REFERENCES users(uuid),
			FOREIGN KEY (tweet_id) REFERENCES tweets(uuid)
		);
	`);
	await pool.query(`
		CREATE TABLE IF NOT EXISTS comments (
			id INT NOT NULL AUTO_INCREMENT,
			uuid VARCHAR(255) NOT NULL UNIQUE,
			user_id VARCHAR(255) NOT NULL,
			tweet_id VARCHAR(255) NOT NULL,
			content TEXT NOT NULL,
			created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			PRIMARY KEY (id),
			FOREIGN KEY (user_id) REFERENCES users(uuid),
			FOREIGN KEY (tweet_id) REFERENCES tweets(uuid)
		);
	`);

	console.log("Database created!");
};

createDB()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
