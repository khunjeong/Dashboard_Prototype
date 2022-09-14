"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var serverStart = function (env, serverPort) {
    console.log("" + chalk_1.default.gray("┌────────────────────────────────────────────────────────────────────────────┐"));
    console.log(chalk_1.default.gray("│") + " [ " + chalk_1.default.cyan("SERVER") + " ] mode: " + chalk_1.default
        .rgb(176, 47, 42)
        .underline(env) + "\t\t\t\t\t\t " + chalk_1.default.gray("│"));
    console.log(chalk_1.default.gray("│") + " [ " + chalk_1.default.cyan("SERVER") + " ] port: " + serverPort + "\t\t\t\t\t\t\t " + chalk_1.default.gray("│"));
    console.log("" + chalk_1.default.gray("└────────────────────────────────────────────────────────────────────────────┘"));
};
exports.default = {
    serverStart: serverStart,
};
