"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const URL = process.env.DATABASE_URL;
exports.db = new sequelize_typescript_1.Sequelize(URL, { models: [__dirname + "/../models/**/*"], logging: false });
//# sourceMappingURL=db.js.map