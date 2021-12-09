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
const app_1 = require("../app");
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
process.env.TS_NODE_ENV && require("dotenv").config();
const request = (0, supertest_1.default)(app_1.app);
describe("Testing the testing environment", () => {
    it("should check that true is true", () => {
        expect(true).toBe(true);
    });
});
describe("Testing the app endpoints", () => {
    beforeAll(done => {
        console.log("This gets run before all tests in this suite");
        mongoose_1.default.connect(process.env.MONGO_URL_TEST).then(() => {
            console.log("Connected to the test database");
            done();
        });
    });
    it("should check that the GET /test endpoint returns a success message", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/test");
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Test successful");
    }));
    //POST NEW PRODUCT AND GET ALL TESTS
    const validProduct = {
        name: "Test Product",
        price: 200,
    };
    it("should check that the POST /products endpoint creates a new product", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post("/products").send(validProduct);
        expect(response.status).toBe(201);
        expect(response.body._id).toBeDefined();
        expect(response.body.name).toBeDefined();
        expect(response.body.price).toBeDefined();
    }));
    it("should check that the GET /products endpoint returns a list of products", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/products");
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    }));
    //GET BY ID TESTS
    it("should check that the GET /product/:id endpoint returns a product with a valid ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const fetchProducts = yield request.get("/products");
        const id = fetchProducts.body[0]._id.toString();
        console.log(id);
        console.log(fetchProducts.body);
        const response = yield request.get(`/products/${id}`);
        console.log(response);
        expect(response.status).toBe(200);
        // expect(response.body.length).toBeGreaterThan(0);
    }));
    it("should check that the GET /products/:id endpoint returns 404 if the product ID doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/products/123");
        expect(response.status).toBe(404);
    }));
    //UPDATE TESTS
    const updatedProductName = {
        name: "MaestroJtapio"
    };
    it("should check that the PUT /product/:id endpoint updates a product and that the data has been changed and is a string", () => __awaiter(void 0, void 0, void 0, function* () {
        const fetchOriginalProductsArray = yield request.get("/products");
        const id = fetchOriginalProductsArray.body[0]._id.toString();
        console.log(id);
        const response = yield request.put(`/products/${id}`).send(updatedProductName);
        console.log(response);
        const checkProductChange = yield request.get(`/products/${id}`);
        expect(response.status).toBe(201);
        expect(typeof checkProductChange.body.name).toBe("string");
        expect(checkProductChange.body.name).toBe("MaestroJtapio");
    }));
    it("should check that the PUT /product/:id with an invalid ID results in a 404", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/products/666`);
        console.log(response);
        expect(response.status).toBe(404);
    }));
    //DELETE TESTS
    it("should check that the DELETE /product/:id endpoint returns a 204 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        const fetchProducts = yield request.get("/products");
        const id = fetchProducts.body[0]._id.toString();
        console.log(id);
        console.log(fetchProducts.body);
        const response = yield request.delete(`/products/${id}`);
        console.log(response);
        expect(response.status).toBe(204);
    }));
    it("should check that the DELETE /products/:id endpoint returns 404 if the product ID doesn't exist AND cannot be deleted", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete("/products/123");
        expect(response.status).toBe(404);
    }));
    afterAll(done => {
        mongoose_1.default.connection.dropDatabase()
            .then(() => {
            return mongoose_1.default.connection.close();
        })
            .then(() => {
            done();
        });
    });
    // it("should test that the GET /products endpoint returns a list of products", async () => {})
});
