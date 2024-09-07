"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const db_1 = require("./config/db");
const morgan_1 = __importDefault(require("morgan"));
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            db_1.db.authenticate();
            db_1.db.sync();
            // console.log("Connected to DB");
        }
        catch (error) {
            // console.log(error);
            console.log("Hubo un error al conectar la base de datos");
        }
    });
}
connectDB();
const server = (0, express_1.default)();
const corsOptions = {
    origin: function (origin, callback) {
        console.log(origin);
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
        }
        else {
            callback(new Error("Error de CORS"));
        }
    },
};
server.use((0, cors_1.default)(corsOptions));
server.use((0, morgan_1.default)("short"));
server.use(express_1.default.json());
server.use("/api/products", routes_1.default);
server.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
exports.default = server;
//# sourceMappingURL=server.js.map