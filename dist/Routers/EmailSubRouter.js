"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Validators_1 = require("../utils/Validators");
const EmailSubscriptionController_1 = require("../Controllers/EmailSubscriptionController");
const subscribeRouter = express_1.default.Router();
// post public 
subscribeRouter.post("/", Validators_1.subsribeVS, Validators_1.valitatorVS, EmailSubscriptionController_1.subscribeController);
exports.default = subscribeRouter;
