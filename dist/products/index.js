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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schema_1 = require("./schema");
const productsRouter = express_1.default.Router();
productsRouter
    .get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield schema_1.ProductModel.find({});
    res.send(products);
}))
    .get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const product = yield schema_1.ProductModel.findById(id);
        if (product) {
            res.status(200).send(product);
        }
    }
    catch (error) {
        res.status(404).send();
    }
}))
    .post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new schema_1.ProductModel(req.body);
    yield product.save();
    res.status(201).send(product);
}))
    .delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deletedPost = yield schema_1.ProductModel.deleteOne({ _id: id });
        if (deletedPost) {
            res.status(204).send(`Post with id: ${id} has been deleted `);
        }
        // } else {
        //   next(createHttpError(404, `post: ${id} not found!`))
        // }
    }
    catch (error) {
        res.status(404).send();
    }
}))
    .put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatedPost = yield schema_1.ProductModel.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedPost) {
            res.status(201).send(updatedPost);
        }
        // else {
        //   next(createHttpError(404, `product: ${id} not found!`))
        // }
    }
    catch (error) {
        res.status(404).send();
    }
}));
exports.default = productsRouter;
