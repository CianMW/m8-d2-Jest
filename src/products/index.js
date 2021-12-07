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
  })
  .delete("/:id", async (req, res) => {
    try {
      const id = req.params.id
      const deletedPost = await ProductModel.deleteOne({_id: id})

      if (deletedPost) {
        res.status(204).send(`Post with id: ${id} has been deleted `)
      }
      // } else {
      //   next(createHttpError(404, `post: ${id} not found!`))
      // }
    } catch (error) {
     res.status(404).send()
    }
  })
  .put("/:id", async (req, res, next) => {
    try {
      const id = req.params.id
      const updatedPost = await ProductModel.findByIdAndUpdate(id, req.body, { new: true })

      if (updatedPost) {
        res.status(201).send(updatedPost)
      } 
      // else {
      //   next(createHttpError(404, `product: ${id} not found!`))
      // }
    } catch (error) {
     res.status(404).send()
    }
  })


export default productsRouter;
