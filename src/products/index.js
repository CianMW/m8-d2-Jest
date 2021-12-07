import express from "express"
import { ProductModel } from "./model.js"

const productsRouter = express.Router()

productsRouter
    .get('/', async (req, res) => {
        const products = await ProductModel.find({})
        res.send(products)
    })
    .post("/", async (req, res) => {
        const product = new ProductModel(req.body)
        await product.save()
        res.status(201).send(product)
    })

export default productsRouter