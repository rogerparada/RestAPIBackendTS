import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.DATABASE_URL;

export const db = new Sequelize(URL, { models: [__dirname + "/../models/**/*"], logging: false });
