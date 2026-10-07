import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";
import { Service } from "../base/service.base.js";
import { ResponseType } from "../types/response.type.js";
import { ProductDatagridRequestType, StoreProductType, UpdateProductType } from "../types/models/product.type.js";
import { ProductRepository } from "../repositories/product.repository.js";
import { GeneralUtil } from "../utils/general.util.js";

/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

@injectable()
export class ProductService extends Service {
  constructor(@inject(ProductRepository) private readonly repository: ProductRepository) {
    super();
  }

  /**
   * @public
   * @async
   * @param {ProductDatagridRequestType} dto
   * @returns {Promise<ResponseType>}
   */
  public async getProduct(dto: ProductDatagridRequestType): Promise<ResponseType> {
    const statusCode: StatusCodes = StatusCodes.OK;
    const apiResponse = this.apiResponse().setCode(statusCode).setDescription(getReasonPhrase(statusCode));
    const isDatagrid: boolean = GeneralUtil.isDatagrid(dto);
    const attributes = ["id", "name", "price"];

    if (isDatagrid) {
      const { rows, pagination } = await this.repository.getProductDatagrid(dto, { attributes });
      apiResponse.setData(rows).setPagination(pagination);
    } else {
      const data = await this.repository.getProduct({ attributes });
      apiResponse.setData(data);
    }

    return { statusCode, data: apiResponse.response() };
  }

  /**
   * @public
   * @async
   * @param {number} id
   * @returns {Promise<ResponseType>}
   */
  public async getProductById(id: number): Promise<ResponseType> {
    const statusCode: StatusCodes = StatusCodes.OK;
    const apiResponse = this.apiResponse().setCode(statusCode).setDescription(getReasonPhrase(statusCode));

    const product = await this.repository.findById(id);
    if (!product) return this.notFound();

    const { name, price } = product;
    apiResponse.setData({ id, name, price });

    return { statusCode, data: apiResponse.response() };
  }

  /**
   * @public
   * @async
   * @param {number} id
   * @param {UpdateProductType} dto
   * @returns {Promise<ResponseType>}
   */
  public async updateProductById(id: number, dto: UpdateProductType): Promise<ResponseType> {
    const statusCode: StatusCodes = StatusCodes.OK;
    const apiResponse = this.apiResponse().setCode(statusCode).setDescription(getReasonPhrase(statusCode));

    const product = await this.repository.findById(id);
    if (!product) return this.notFound();

    const payload: UpdateProductType = { name: dto.name, price: dto.price };
    const [updated] = await this.repository.updateProduct(id, payload);
    if (updated < 0) return this.internalServerError("");

    apiResponse.setData({ id, name: dto.name, price: dto.price });

    return { statusCode, data: apiResponse.response() };
  }

  /**
   * @public
   * @async
   * @param {number} id
   * @returns {Promise<ResponseType>}
   */
  public async destroyProductById(id: number): Promise<ResponseType> {
    const statusCode: StatusCodes = StatusCodes.OK;
    const apiResponse = this.apiResponse().setCode(statusCode).setDescription(getReasonPhrase(statusCode));

    const product = await this.repository.findById(id);
    if (!product) return this.notFound();

    await this.repository.destroyProduct(id);

    return { statusCode, data: apiResponse.response() };
  }

  /**
   * @public
   * @async
   * @param {StoreProductType} dto
   * @returns {Promise<ResponseType>}
   */
  public async storeProduct(dto: StoreProductType): Promise<ResponseType> {
    const statusCode: StatusCodes = StatusCodes.OK;
    const apiResponse = this.apiResponse().setCode(statusCode).setDescription(getReasonPhrase(statusCode));

    const payload: StoreProductType = { name: dto.name, price: dto.price };
    const product = await this.repository.storeProduct(payload);
    if (!product) return this.internalServerError(product);

    const { id, name, price } = product;
    apiResponse.setData({ id, name, price });

    return { statusCode, data: apiResponse.response() };
  }
}
