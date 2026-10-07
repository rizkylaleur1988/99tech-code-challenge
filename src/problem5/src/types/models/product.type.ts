import { Product } from "../../models/product.model.js";
import { DatagridRequestType } from "../datagrid.type.js";

/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

export type ProductType = Pick<Product, "id" | "name" | "price">;
export type StoreProductType = Omit<ProductType, "id">;
export type UpdateProductType = Omit<ProductType, "id">;
export type ProductDatagridRequestType = DatagridRequestType<ProductType>;
