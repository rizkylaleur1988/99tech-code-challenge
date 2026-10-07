import { Router } from "express";
import { container } from "tsyringe";
import { ProductController } from "../controllers/product.controller.js";
import { validation } from "../middleware/validation.middleware.js";
import { validateCreateProduct, validateDeleteProductById, validateGetProductById, validateUpdateProduct } from "../validators/product.validator.js";

/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

const controller = container.resolve(ProductController);

const productRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Pagination:
 *       type: object
 *       required:
 *         - page
 *         - limit
 *         - total
 *         - totalPages
 *       properties:
 *         page:
 *           type: number
 *         limit:
 *           type: number
 *         total:
 *           type: number
 *         totalPages:
 *           type: number
 *     DefaultResponse:
 *       type: object
 *       required:
 *         - code
 *         - message
 *       properties:
 *         code:
 *           type: number
 *         message:
 *           type: string
 *         data:
 *           oneOf:
 *             - type: object
 *             - type: array
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *     ProductInput:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *     ProductListResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/DefaultResponse'
 *         - type: object
 *           properties:
 *              data:
 *                 type: array
 *                 items:
 *                    $ref: '#/components/schemas/Product'
 *              pagination:
 *                 $ref: '#/components/schemas/Pagination'
 *                 type: object
 *     ProductResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/DefaultResponse'
 *         - type: object
 *           properties:
 *              data:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The products managing API
 */

/**
 * @swagger
 * /v1.0/products:
 *   get:
 *     summary: Returns the list of all the products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Number of products per page
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Search products
 *       - in: query
 *         name: sortBy
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - id
 *             - name
 *             - price
 *         description: Field used to sort the products
 *       - in: query
 *         name: sortType
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - ASC
 *             - DESC
 *         description: Sort direction
 *       - in: query
 *         name: filters[id]
 *         required: false
 *         schema:
 *           type: integer
 *         description: Filter products by id
 *       - in: query
 *         name: filters[name]
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter products by name
 *       - in: query
 *         name: filters[price]
 *         required: false
 *         schema:
 *           type: integer
 *         description: Filter products by price
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductListResponse'
 */
productRouter.get("/v1.0/products", controller.getProduct.bind(controller));

/**
 * @swagger
 * /v1.0/products/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       404:
 *         description: The product was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DefaultResponse'
 */
productRouter.get("/v1.0/products/:id", validation(validateGetProductById), controller.getProductById.bind(controller));

/**
 * @swagger
 * /v1.0/products/{id}:
 *   put:
 *     summary: Update the product by the id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: The product was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       404:
 *         description: The product was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DefaultResponse'
 */
productRouter.put("/v1.0/products/:id", validation(validateUpdateProduct), controller.updateProductById.bind(controller));

/**
 * @swagger
 * /v1.0/products/{id}:
 *   delete:
 *     summary: Remove the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DefaultResponse'
 *       404:
 *         description: The product was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DefaultResponse'
 */
productRouter.delete("/v1.0/products/:id", validation(validateDeleteProductById), controller.destroyProductById.bind(controller));

/**
 * @swagger
 * /v1.0/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       422:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DefaultResponse'
 */
productRouter.post("/v1.0/products", validation(validateCreateProduct), controller.storeProduct.bind(controller));

export { productRouter };
