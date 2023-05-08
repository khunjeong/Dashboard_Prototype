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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var data_1 = __importDefault(require("./../data"));
var router = (0, express_1.Router)();
var makeRandomData = function (min, max, originValue) {
    var randVal = Math.floor(Math.random() * (max - min + 1)) + min;
    var result = randVal * 0.01 * originValue;
    return parseInt("".concat(result));
};
var makeRandom = function (min, max) {
    var RandVal = Math.floor(Math.random() * (max - min + 1)) + min;
    return RandVal;
};
router.get("/visitor", function (req, res) {
    try {
        console.log("data", data_1.default);
        var dailyVisitor = data_1.default.daily;
        console.log("dailyVisitor", dailyVisitor);
        var sendData = {
            success: true,
            visitors: [
                {
                    mixture_id: 1,
                    title: "실시간 방문자",
                    data: dailyVisitor * (makeRandom(30, 33) * 0.01),
                },
                { mixture_id: 7, title: "하루 방문자", data: dailyVisitor },
                {
                    mixture_id: 15,
                    title: "재 방문자",
                    data: dailyVisitor * (makeRandom(5, 7) * 0.01),
                },
                {
                    mixture_id: 9,
                    title: "체류 시간",
                    data: (600 + makeRandomData(10, 20, 600)) / 60,
                },
            ],
        };
        res.status(200).send(sendData);
    }
    catch (e) {
        var sendData = {
            success: false,
            error: e,
        };
        res.status(200).send(sendData);
    }
});
router.get("/zone/:id", function (req, res) {
    try {
        console.log("data", data_1.default);
        console.log("req param", req.param);
        console.log("req params", req.params);
        var dailyVisitor = data_1.default.zone[req.params.id];
        console.log("dailyVisitor", dailyVisitor);
        var sendData = {
            success: true,
            visitors: [
                {
                    mixture_id: 1,
                    title: "실시간 방문자",
                    data: dailyVisitor * (makeRandom(30, 33) * 0.01),
                },
                { mixture_id: 7, title: "하루 방문자", data: dailyVisitor },
                {
                    mixture_id: 15,
                    title: "재 방문자",
                    data: dailyVisitor * (makeRandom(5, 7) * 0.01),
                },
                {
                    mixture_id: 9,
                    title: "체류 시간",
                    data: (600 + makeRandomData(10, 20, 600)) / 60,
                },
            ],
        };
        res.status(200).send(sendData);
    }
    catch (e) {
        var sendData = {
            success: false,
            error: e,
        };
        res.status(200).send(sendData);
    }
});
router.get("/environment", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var environments, sendData, sendData;
    return __generator(this, function (_a) {
        try {
            environments = [
                { mixture_id: 2, title: "온도", data: 22 + makeRandomData(10, 20, 22) },
                { mixture_id: 3, title: "습도", data: 70 + makeRandomData(10, 20, 70) },
                {
                    mixture_id: 5,
                    title: "미세먼지",
                    data: 21 + makeRandomData(10, 20, 21),
                },
                {
                    mixture_id: 6,
                    title: "초미세먼지",
                    data: 13 + makeRandomData(10, 20, 13),
                },
                { mixture_id: 4, title: "CO2", data: 387 + makeRandomData(10, 20, 387) },
                {
                    mixture_id: 12,
                    title: "tvoc",
                    data: 578 + makeRandomData(10, 20, 548),
                },
            ];
            sendData = {
                success: true,
                environments: environments,
            };
            res.status(200).send(sendData);
        }
        catch (e) {
            sendData = {
                success: false,
                error: e,
            };
            res.send(sendData);
        }
        return [2 /*return*/];
    });
}); });
router.get("/chart", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sendData, sendData;
    return __generator(this, function (_a) {
        try {
            sendData = {
                success: true,
                datas: [],
            };
            res.status(200).send(sendData);
        }
        catch (e) {
            sendData = {
                success: false,
                error: e,
            };
            res.status(200).send(sendData);
        }
        return [2 /*return*/];
    });
}); });
exports.default = router;
