import express from "express";
import { ProductModel } from "./model.js";

const productsRouter = express.Router();

productsRouter
  .get("/", async (req, res, next) => {
    const products = await ProductModel.find({});
    res.send(products);
  })
  .get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const product = await ProductModel.findById(id);
      if (product) {
        res.status(200).send(product);
      }
    } catch (error) {
      res.status(404).send();
    }
  })
  .post("/", async (req, res) => {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(201).send(product);
  });

export default productsRouter;
