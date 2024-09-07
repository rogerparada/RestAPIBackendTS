import request from "supertest";
import server from "../../server";

describe("POST API /api/products", () => {
	it("Should display validation errors", async () => {
		const response = await request(server).post("/api/products").send({});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");

		expect(response.status).not.toBe(404);
		expect(response.body.errors).not.toHaveLength(3);
	});
	it("Validate if price is greater than 0", async () => {
		const response = await request(server).post("/api/products").send({
			name: "Monitor",
			price: 0,
		});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(1);

		expect(response.status).not.toBe(404);
		expect(response.body.errors).not.toHaveLength(2);
	});
	it("Validate if price is a number  greater than 0", async () => {
		const response = await request(server).post("/api/products").send({
			name: "Monitor",
			price: "Hola",
		});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(2);

		expect(response.status).not.toBe(404);
		expect(response.body.errors).not.toHaveLength(3);
	});
	it("Create a new product", async () => {
		const response = await request(server).post("/api/products").send({
			name: "Tele 50  pulgadas",
			price: 700,
		});

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("data");

		expect(response.status).not.toBe(200);
		expect(response.body).not.toHaveProperty("errors");
	});
});

describe("GET /api/products", () => {
	it("Should check if api/products url exits", async () => {
		const response = await request(server).get("/api/products");
		expect(response.status).not.toBe(404);
	});

	it("GET a JSON response with products", async () => {
		const response = await request(server).get("/api/products");
		expect(response.status).toBe(200);
		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.body).toHaveProperty("data");
		expect(response.body.data).toHaveLength(1);
		expect(response.body).not.toHaveProperty("errors");
	});
});

describe("GET /api/products/:id", () => {
	it("Should return 404  response for a non existent product", async () => {
		const productID = 500;
		const response = await request(server).get(`/api/products/${productID}`);
		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error).toBe("Producto no encontrado");
		expect(response.status).not.toBe(200);
	});

	it("Should check a valid ID  in the URL", async () => {
		const response = await request(server).get("/api/products/url-not-valid");
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(1);
		expect(response.body.errors[0].msg).toBe("El id debe ser un numero");
	});

	it("Get a JSON response for a single product", async () => {
		const response = await request(server).get("/api/products/1");
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("data");
	});
});

describe("PUT /api/products/:id", () => {
	it("Should check a valid ID  in the URL", async () => {
		const response = await request(server).put("/api/products/url-not-valid").send({
			name: "Monitor put",
			availability: true,
			price: 10,
		});
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(1);
		expect(response.body.errors[0].msg).toBe("El id debe ser un numero");
	});

	it("Should display validation errors when updating a product", async () => {
		const response = await request(server).put("/api/products/1").send({});
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toBeTruthy();
		expect(response.body.errors).toHaveLength(5);

		expect(response.status).not.toBe(200);
		expect(response.body).not.toHaveProperty("data");
	});
	it("Should validate the price is greater than 0", async () => {
		const response = await request(server).put("/api/products/1").send({
			name: "Monitor put",
			availability: true,
			price: 0,
		});
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toBeTruthy();
		expect(response.body.errors).toHaveLength(1);

		expect(response.status).not.toBe(200);
		expect(response.body).not.toHaveProperty("data");
	});

	it("Should return 404  response for a non existent product", async () => {
		const productID = 500;
		const response = await request(server).put(`/api/products/${productID}`).send({
			name: "Monitor put",
			availability: true,
			price: 10,
		});
		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error).toBe("Producto no encontrado");
		expect(response.status).not.toBe(200);
	});
	it("Should be updated product with a valid data", async () => {
		const response = await request(server).put("/api/products/1").send({
			name: "Monitor put",
			availability: true,
			price: 10,
		});
		expect(response.status).toBe(202);
		expect(response.body).toHaveProperty("data");
	});
});

describe("PATCH /api/products/:id", () => {
	it("Should check a valid ID  in the URL", async () => {
		const response = await request(server).patch("/api/products/url-not-valid");
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(1);
		expect(response.body.errors[0].msg).toBe("ID no valido");
	});

	it("Should return 404  response for a non existent product", async () => {
		const productID = 500;
		const response = await request(server).patch(`/api/products/${productID}`);
		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error).toBe("Producto no encontrado");
		expect(response.status).not.toBe(200);
		expect(response.status).not.toHaveProperty("data");
	});

	it("Should update the product availability", async () => {
		const response = await request(server).patch("/api/products/1");
		expect(response.status).toBe(202);
		expect(response.body).toHaveProperty("data");
		expect(response.body.availability).toBeFalsy();

		expect(response.status).not.toBe(400);
		expect(response.status).not.toBe(404);
		expect(response.body).not.toHaveProperty("errors");
	});
});

describe("DELETE /api/products", () => {
	it("Should check a valid ID", async () => {
		const response = await request(server).delete("/api/products/not-a-valid");

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(1);
		expect(response.body.errors[0].msg).toBe("ID no valido");
	});

	it("Should return a 404 response for a non existent product", async () => {
		const productID = 2000;
		const response = await request(server).delete(`/api/products/${productID}`);

		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error).toBe("Producto no encontrado");
		expect(response.status).not.toBe(200);
	});

	it("Should delete a product", async () => {
		const response = await request(server).delete("/api/products/1");
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("data");
		expect(response.body.data).toBe("Producto eliminado");

		expect(response.status).not.toBe(400);
		expect(response.status).not.toBe(404);
	});
});
