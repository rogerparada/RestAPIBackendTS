import request from "supertest";
import server, { connectDB } from "../server";
import { db } from "../config/db";

describe("GET /api", () => {
	it("Should send back a JSON Response", async () => {
		const res = await request(server).get("/api");

		expect(res.status).toBe(200);
		expect(res.headers["content-type"]).toMatch(/json/);
		expect(res.body.msg).toBe("Desde API");

		expect(res.status).not.toBe(400);
		expect(res.body.msg).not.toBe("Desde api");
	});
});

// jest.mock("../config/db");

// describe("ConnectDB", () => {
// 	it("Should handle Connection errors", async () => {
// 		jest.spyOn(db, "authenticate").mockRejectedValueOnce(new Error("Hubo un error al conectar la base de datos"));
// 		const consoleSpy = jest.spyOn(console, "log");
// 		await connectDB();

// 		//expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Hubo un error al conectar la base de datos"));
// 	});
// });

// jest.mock("../config/db", () => {
// 	return {
// 		authenticate: jest.fn(),
// 		sync: jest.fn(),
// 	};
// });

// describe("connect to database", () => {
// 	it("should handle database connection errors", async () => {
// 		jest.spyOn(db, "authenticate").mockRejectedValue(new Error("Unable to connect to the database: "));
// 		const consoleSpy = jest.spyOn(console, "log");
// 		await connectDB();
// 		expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Unable to connect to the database:"), expect.any(Error));
// 	});
// });
