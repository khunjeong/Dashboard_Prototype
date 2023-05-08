"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.join(__dirname, "./../../.env.".concat(process.env.NODE_ENV === "production" ? "prod" : "dev")),
});
var env;
(function (env) {
    env["production"] = "production";
    env["development"] = "development";
    env["test"] = "test";
})(env = exports.env || (exports.env = {}));
var environments = {
    env: env[process.env.NODE_ENV] || env.development,
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt("".concat(process.env.DB_PORT)),
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
};
exports.default = environments;
