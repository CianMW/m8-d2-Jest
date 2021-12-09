"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./products"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.get('/test', (req, res) => {
    res.send({ message: "Test successful" });
});
app.use('/products', products_1.default);
