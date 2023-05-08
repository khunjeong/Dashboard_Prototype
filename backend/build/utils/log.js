"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var serverStart = function (env, serverPort) {
    console.log("".concat(chalk_1.default.gray("┌────────────────────────────────────────────────────────────────────────────┐")));
    console.log("".concat(chalk_1.default.gray("│"), " [ ").concat(chalk_1.default.cyan("SERVER"), " ] mode: ").concat(chalk_1.default
        .rgb(176, 47, 42)
        .underline(env), "\t\t\t\t\t\t ").concat(chalk_1.default.gray("│")));
    console.log("".concat(chalk_1.default.gray("│"), " [ ").concat(chalk_1.default.cyan("SERVER"), " ] port: ").concat(serverPort, "\t\t\t\t\t\t\t ").concat(chalk_1.default.gray("│")));
    console.log("".concat(chalk_1.default.gray("└────────────────────────────────────────────────────────────────────────────┘")));
};
exports.default = {
    serverStart: serverStart,
};
