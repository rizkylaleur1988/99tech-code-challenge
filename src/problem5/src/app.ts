import express, { type Express } from "express";
import "reflect-metadata";
import { router } from "./routers/router.route.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.config.js";
import { ErrorMiddleware } from "./middleware/error.middleware.js";

/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

const errorHandler = new ErrorMiddleware();

const app: Express = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.set("query parser", "extended");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(router);
app.use(errorHandler.handle.bind(errorHandler));

export { app };
