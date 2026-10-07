import type { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { ResponseType } from "../types/response.type.js";
import { ProductService } from "../services/product.service.js";

/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

@injectable()
export class ProductController {
  constructor(@inject(ProductService) private readonly service: ProductService) {}

  /**
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  public async getProduct(req: Request, res: Response): Promise<void> {
    const result: ResponseType = await this.service.getProduct(req.query);
    res.status(result.statusCode).json(result.data);
  }

  /**
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  public async getProductById(req: Request, res: Response): Promise<void> {
    const id: number = Number(req.params.id);
    const result: ResponseType = await this.service.getProductById(id);
    res.status(result.statusCode).json(result.data);
  }

  /**
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  public async updateProductById(req: Request, res: Response): Promise<void> {
    const id: number = Number(req.params.id);
    const result: ResponseType = await this.service.updateProductById(id, req.body);
    res.status(result.statusCode).json(result.data);
  }

  /**
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  public async destroyProductById(req: Request, res: Response): Promise<void> {
    const id: number = Number(req.params.id);
    const result: ResponseType = await this.service.destroyProductById(id);
    res.status(result.statusCode).json(result.data);
  }

  /**
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  public async storeProduct(req: Request, res: Response): Promise<void> {
    const result: ResponseType = await this.service.storeProduct(req.body);
    res.status(result.statusCode).json(result.data);
  }
}
