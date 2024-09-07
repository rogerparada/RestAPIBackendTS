import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import cors, { CorsOptions } from "cors";
import ProductsRouter from "./routes";
import { db } from "./config/db";
import morgan from "morgan";

export async function connectDB() {
	try {
		db.authenticate();
		db.sync();
		// console.log("Connected to DB");
	} catch (error) {
		// console.log(error);
		console.log("Hubo un error al conectar la base de datos");
	}
}
connectDB();

const server = express();

const corsOptions: CorsOptions = {
	origin: function (origin, callback) {
		console.log(origin);

		if (origin === process.env.FRONTEND_URL) {
			callback(null, true);
		} else {
			callback(new Error("Error de CORS"));
		}
	},
};

server.use(cors(corsOptions));
server.use(morgan("short"));
server.use(express.json());
server.use("/api/products", ProductsRouter);
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;
