import { DatagridRequestType } from "../types/datagrid.type.js";

/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

export class GeneralUtil {
  /**
   * @static
   * @param {DatagridRequestType} dto
   * @returns {boolean}
   */
  static isDatagrid(dto: DatagridRequestType): boolean {
    return !!(dto?.page || dto?.limit || dto?.search || dto?.sortBy || dto?.sortType || dto?.filters);
  }
}
