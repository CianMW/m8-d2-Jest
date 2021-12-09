import { ProductSchema } from "./schema.js";
import { model } from "mongoose";
import { IProduct } from "../interfaces/index.js";

export const ProductModel = model<IProduct>("products", ProductSchema);