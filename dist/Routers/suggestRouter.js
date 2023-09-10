"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const suggestController_1 = require("../Controllers/suggestController");
const Validators_1 = require("../utils/Validators");
const suggestRouter = express_1.default.Router();
suggestRouter.post("/", Validators_1.suggestProductVS, Validators_1.valitatorVS, suggestController_1.suggestProductController);
exports.default = suggestRouter;
