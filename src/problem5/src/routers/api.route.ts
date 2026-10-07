import { Router } from "express";
import { productRouter } from "./product.route.js";

/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

const api = Router();

api.use(productRouter);

export { api };
