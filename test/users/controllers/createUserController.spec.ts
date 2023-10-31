import request from "supertest";
import { v4 } from "uuid";

import app from "../../../src/app";
import { CreateUserRequest } from "../../../src/users/interfaces/createUserRequest";
import { UsersRepository } from "../../../src/users/repository/usersRepository";

describe("POST /api/v1/users", () => {
	it("should encrypt the password ", async () => {
		const password = "teSt1234";
		const passwordHash: string = await UsersRepository.createHashPassword(password);
		expect(passwordHash).not.toEqual(password);
	});
	it("should return 201 Created", () => {
		const user: CreateUserRequest = {
			uuid: v4(),
			username: "test",
			email: "test@test.com",
			password: "teSt1234",
			repeat_password: "teSt1234",
		};

		return request(app).post("/api/v1/users").send(user).expect(201);
	});
});
