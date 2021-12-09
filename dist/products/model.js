"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const schema_js_1 = require("./schema.js");
const mongoose_1 = require("mongoose");
exports.ProductModel = (0, mongoose_1.model)("products", schema_js_1.ProductSchema);
