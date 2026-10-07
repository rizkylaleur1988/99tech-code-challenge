import { CreateOptions, DestroyOptions, FindAndCountOptions, FindOptions, UpdateOptions, WhereOptions } from "sequelize";
import { injectable } from "tsyringe";
import { Repository } from "../base/repository.base.js";
import { Product } from "../models/product.model.js";
import { ProductDatagridRequestType, ProductType, StoreProductType, UpdateProductType } from "../types/models/product.type.js";
import { DatagridResponseType } from "../types/datagrid.type.js";

/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

@injectable()
export class ProductRepository extends Repository<Product> {
  constructor() {
    super(Product);
  }

  /**
   * @public
   * @async
   * @param {?FindOptions<Product>} [options]
   * @returns {Promise<Array<Product>>}
   */
  public async getProduct(options?: FindOptions<Product>): Promise<Array<Product>> {
    return await this.findAll({ ...options });
  }

  /**
   * @public
   * @async
   * @param {ProductDatagridRequestType} dto
   * @param {?FindAndCountOptions<Product>} [options]
   * @returns {Promise<DatagridResponseType<Product>>}
   */
  public async getProductDatagrid(dto: ProductDatagridRequestType, options?: FindAndCountOptions<Product>): Promise<DatagridResponseType<Product>> {
    const whereClause: WhereOptions<Product> = {};
    const searchableColumns: (keyof ProductType)[] = ["id", "name", "price"];
    const filterableColumns: (keyof ProductType)[] = searchableColumns;
    const sortableColumns: (keyof ProductType)[] = searchableColumns;
    options = this.buildDatagridOptions(dto, searchableColumns, filterableColumns, sortableColumns, whereClause, options);

    return await this.datagrid(dto, options);
  }

  /**
   * @public
   * @async
   * @param {number} id
   * @param {?FindOptions<Product>} [options]
   * @returns {Promise<Product | null>}
   */
  public async findById(id: number, options?: FindOptions<Product>): Promise<Product | null> {
    return this.findOne({ where: { id }, ...options });
  }

  /**
   * @public
   * @async
   * @param {number} id
   * @param {UpdateProductType} payload
   * @param {?UpdateOptions<Product>} [options]
   * @returns {Promise<[affectedCount: number]>}
   */
  public async updateProduct(id: number, payload: UpdateProductType, options?: UpdateOptions<Product>): Promise<[affectedCount: number]> {
    return this.update(payload, { ...options, where: { id } });
  }

  /**
   * @public
   * @async
   * @param {number} id
   * @param {?DestroyOptions<Product>} [options]
   * @returns {Promise<number>}
   */
  public async destroyProduct(id: number, options?: DestroyOptions<Product>): Promise<number> {
    return this.delete({ ...options, where: { id } });
  }

  /**
   * @public
   * @async
   * @param {StoreProductType} payload
   * @param {?CreateOptions} [options]
   * @returns {Promise<Product>}
   */
  public async storeProduct(payload: StoreProductType, options?: CreateOptions): Promise<Product> {
    return await this.store(payload, options);
  }
}
