
import { app } from '../app.js';
import supertest from "supertest"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const request = supertest(app)

describe("Testing the testing environment", () => {

    it("should check that true is true", () => {
        expect(true).toBe(true);
    });


})

describe("Testing the app endpoints", () => {


    beforeAll(done => {
        console.log("This gets run before all tests in this suite")

        mongoose.connect(process.env.MONGO_URL_TEST).then(() => {
            console.log("Connected to the test database")
            done()
        })
    })



    it("should check that the GET /test endpoint returns a success message", async () => {
        const response = await request.get("/test");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Test successful");
    })

    const validProduct = {
        name: "Test Product",
        price: 200,
    }

    it("should check that the POST /products endpoint creates a new product", async () => {
        const response = await request.post("/products").send(validProduct)

        expect(response.status).toBe(201);
        expect(response.body._id).toBeDefined();
        expect(response.body.name).toBeDefined();
        expect(response.body.price).toBeDefined();
    })

    it("should check that the GET /products endpoint returns a list of products", async () => {
        const response = await request.get("/products");

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    })
    it("should check that the GET /product/:id endpoint returns a product with a valid ID", async () => {
        const fetchProducts = await request.get("/products");
               const id = fetchProducts.body[0]._id.toString()
               console.log(id)
               console.log(fetchProducts.body)
        const response = await request.get(`/products/${id}`)
        console.log(response)

        expect(response.status).toBe(200);
        // expect(response.body.length).toBeGreaterThan(0);
    })

    it("should check that the GET /products/:id endpoint returns 404 if the product ID doesn't exist", async () => {
        const response = await request.get("/products/123");

        expect(response.status).toBe(404);
    })

    const updatedProductName = {
        name: "MaestroJtapio"
    }

    it("should check that the PUT /product/:id endpoint updates a product and that the data has been changed", async () => {
        const fetchOriginalProductsArray = await request.get("/products");
               const id = fetchOriginalProductsArray.body[0]._id.toString()
               console.log(id)
        const response = await request.put(`/products/${id}`).send(updatedProductName)
        console.log(response)
        const checkProductChange = await request.get(`/products/${id}`)


        expect(response.status).toBe(201);
        expect(checkProductChange.body.name).toBe("MaestroJtapio");
    })


    it("should check that the DELETE /product/:id endpoint returns a 204 status code", async () => {
        const fetchProducts = await request.get("/products");
               const id = fetchProducts.body[0]._id.toString()
               console.log(id)
               console.log(fetchProducts.body)
        const response = await request.delete(`/products/${id}`)
        console.log(response)

        expect(response.status).toBe(204);
    })

    it("should check that the DELETE /products/:id endpoint returns 404 if the product ID doesn't exist AND cannot be deleted", async () => {
        const response = await request.delete("/products/123");

        expect(response.status).toBe(404);
    })




    afterAll(done => {
        mongoose.connection.dropDatabase()
            .then(() => {
                return mongoose.connection.close()
            })
            .then(() => {
                done()
            })
    })


    // it("should test that the GET /products endpoint returns a list of products", async () => {})

})