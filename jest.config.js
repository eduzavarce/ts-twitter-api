const dotenv = require("dotenv");

dotenv.config();
module.exports = {
	testEnvironment: "node",
	moduleFileExtensions: ["ts", "js"],
	testMatch: ["**/test/**/*.spec.(ts|js)"],
	transform: {
		"^.+\\.(ts|tsx)$": [
			"ts-jest",
			{
				tsconfig: "tsconfig.json",
			},
		],
	},
};
