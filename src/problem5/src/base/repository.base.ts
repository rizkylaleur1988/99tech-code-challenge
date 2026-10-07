import {
  AggregateOptions,
  Attributes,
  BulkCreateOptions,
  CountOptions,
  CreateOptions,
  CreationAttributes,
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  Model,
  ModelStatic,
  Op,
  Sequelize,
  Transaction,
  UpdateOptions,
  WhereOptions,
} from "sequelize";
import { database } from "../config/database.config.js";
import { DatagridRequestType, DatagridResponseType } from "../types/datagrid.type.js";

/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

type SortType = "ASC" | "DESC";

export class Repository<T extends Model> {
  private readonly entity: ModelStatic<T>;
  private readonly sequelize: Sequelize;

  constructor(entity: ModelStatic<T>) {
    this.entity = entity;
    this.sequelize = database;
  }

  /**
   * @protected
   * @async
   * @param {?FindOptions<T>} [options]
   * @returns {Promise<Array<T>>}
   */
  protected async findAll(options?: FindOptions<T>): Promise<Array<T>> {
    return await this.entity.findAll(options);
  }

  /**
   * @protected
   * @async
   * @param {?FindOptions<T>} [options]
   * @returns {Promise<T | null>}
   */
  protected async findOne(options?: FindOptions<T>): Promise<T | null> {
    return await this.entity.findOne(options);
  }

  /**
   * @protected
   * @async
   * @param {(string | number)} id
   * @returns {Promise<T | null>}
   */
  protected async findByPk(id: string | number): Promise<T | null> {
    return await this.entity.findByPk(id);
  }

  /**
   * @protected
   * @async
   * @param {CreationAttributes<T>} payload
   * @param {?CreateOptions} [options]
   * @returns {Promise<T>}
   */
  protected async store(payload: CreationAttributes<T>, options?: CreateOptions): Promise<T> {
    return await this.entity.create(payload, options);
  }

  /**
   * @protected
   * @async
   * @param {Partial<T>} payload
   * @param {UpdateOptions<T>} options
   * @returns {Promise<[affectedCount: number]>}
   */
  protected async update(payload: Partial<T>, options: UpdateOptions<T>): Promise<[affectedCount: number]> {
    return await this.entity.update(payload, options);
  }

  /**
   * @protected
   * @async
   * @param {DestroyOptions<T>} options
   * @returns {Promise<number>}
   */
  protected async delete(options: DestroyOptions<T>): Promise<number> {
    return await this.entity.destroy(options);
  }

  /**
   * @protected
   * @async
   * @template T
   * @param {(t: Transaction) => Promise<T>} callback
   * @returns {Promise<T>}
   */
  protected async transaction<T>(callback: (t: Transaction) => Promise<T>): Promise<T> {
    return this.sequelize.transaction(callback);
  }

  /**
   * @protected
   * @async
   * @param {?CountOptions<T>} [options]
   * @returns {Promise<number>}
   */
  protected async count(options?: CountOptions<T>): Promise<number> {
    return await this.entity.count(options);
  }

  /**
   * @protected
   * @async
   * @param {ReadonlyArray<CreationAttributes<T>>} payloads
   * @param {?BulkCreateOptions<T>} [options]
   * @returns {Promise<T[]>}
   */
  protected async bulkCreate(payloads: ReadonlyArray<CreationAttributes<T>>, options?: BulkCreateOptions<T>): Promise<T[]> {
    return await this.entity.bulkCreate(payloads, options);
  }

  /**
   * @protected
   * @async
   * @param {?FindAndCountOptions} [options]
   * @returns {Promise<{ rows: T[]; count: number }>}
   */
  protected async findAndCountAll(options?: FindAndCountOptions): Promise<{ rows: T[]; count: number }> {
    return await this.entity.findAndCountAll(options);
  }

  /**
   * @protected
   * @async
   * @template TFilter
   * @param {DatagridRequestType<TFilter>} dto
   * @param {?FindAndCountOptions<T>} [options]
   * @returns {Promise<DatagridResponseType<T>>}
   */
  protected async datagrid<TFilter>(dto: DatagridRequestType<TFilter>, options?: FindAndCountOptions<T>): Promise<DatagridResponseType<T>> {
    const page: number = Number(dto.page ?? 1);
    const limit: number = Number(dto.limit ?? 10);
    const offset: number = (page - 1) * limit;
    const { rows, count: total } = await this.findAndCountAll({
      ...options,
      limit,
      offset,
    });
    const totalPages: number = Math.ceil(total / limit);
    return { rows, pagination: { page, limit, total, totalPages } };
  }

  /**
   * @protected
   * @template TFilter
   * @param {DatagridRequestType<TFilter>} dto
   * @param {(keyof TFilter)[]} searchableColumns
   * @param {(keyof TFilter)[]} filterableColumns
   * @param {(keyof TFilter)[]} sortableColumns
   * @param {WhereOptions<T>} [where={}]
   * @param {?FindAndCountOptions<T>} [options]
   * @returns {FindAndCountOptions<T>}
   */
  protected buildDatagridOptions<TFilter>(
    dto: DatagridRequestType<TFilter>,
    searchableColumns: (keyof TFilter)[],
    filterableColumns: (keyof TFilter)[],
    sortableColumns: (keyof TFilter)[],
    where: WhereOptions<T> = {},
    options?: FindAndCountOptions<T>,
  ): FindAndCountOptions<T> {
    const allowedFilters = new Set(filterableColumns.map(String));
    const sortableSet = new Set(sortableColumns.map(String));

    if (dto.search) {
      Object.assign(where, {
        [Op.or]: searchableColumns.map((column) => ({
          [column]: {
            [Op.like]: `%${dto.search}%`,
          },
        })),
      });
    }

    if (dto.filters) {
      Object.entries(dto.filters).forEach(([key, value]) => {
        if (
          allowedFilters.has(key) &&
          value !== undefined &&
          value !== null &&
          value !== "" &&
          (typeof value === "string" || typeof value === "number" || typeof value === "boolean")
        ) {
          Object.assign(where, {
            [key]: {
              [Op.like]: `%${String(value)}%`,
            },
          });
        }
      });
    }

    const sortType: SortType | undefined = this.getSortType(dto.sortType);

    return {
      ...options,
      where,
      ...(dto.sortBy &&
        sortType &&
        sortableSet.has(String(dto.sortBy)) && {
          order: [[String(dto.sortBy), sortType]],
        }),
    };
  }

  /**
   * @protected
   * @async
   * @param {keyof Attributes<T>} field
   * @param {?AggregateOptions<number>} [options]
   * @returns {Promise<number>}
   */
  protected async max(field: keyof Attributes<T>, options?: AggregateOptions<number>): Promise<number> {
    return await this.entity.max(field, options);
  }

  /**
   * @private
   * @param {?string} [sortType]
   * @returns {(SortType | undefined)}
   */
  private getSortType(sortType?: string): SortType | undefined {
    if (!sortType) return undefined;

    if (sortType.toUpperCase().trim() === "ASC") return "ASC";
    else if (sortType.toUpperCase().trim() === "DESC") return "DESC";
  }
}
