import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join(
    __dirname,
    `./../../.env.${process.env.NODE_ENV === "production" ? "prod" : "dev"}`
  ),
});

export enum env {
  production = "production",
  development = "development",
  test = "test",
}

export interface Environments {
  env: env;
  PORT: number | string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
}

const environments: Environments = {
  env: env[process.env.NODE_ENV] || env.development,
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(`${process.env.DB_PORT}`),
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
};

export default environments;
