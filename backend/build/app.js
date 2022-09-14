"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var api_1 = __importDefault(require("./api"));
var App = /** @class */ (function () {
    function App() {
        this._express = express_1.default();
        this._express.use(cors_1.default());
        this._express.use(morgan_1.default("dev"));
        this._express.use("/api", api_1.default);
        this._express.use("/", express_1.default.static("./../frontend/dist"));
        this._express.get("*", function (req, res) {
            res.sendFile(path_1.default.join(__dirname, "./../../frontend/dist/index.html"));
        });
    }
    Object.defineProperty(App.prototype, "express", {
        get: function () {
            return this._express;
        },
        enumerable: false,
        configurable: true
    });
    App.prototype.listening = function (port) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._express.listen(port, function () {
                resolve(port);
            });
        });
    };
    return App;
}());
var app = new App();
exports.default = app;
