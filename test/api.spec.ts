import request from "supertest";

import app from "../src/app";

describe("GET /api/v1/status", () => {
	it("should return 200 OK", () => {
		return request(app).get("/api/v1/status").expect(200);
	});
});
describe("GET /unknown_location", () => {
	it("should return 404 Not Found", () => {
		return request(app).get("/unknown_location").expect(404);
	});
});
