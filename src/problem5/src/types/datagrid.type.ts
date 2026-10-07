/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

export type DatagridRequestType<TFilter = Record<string, unknown>> = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: keyof TFilter;
  sortType?: "ASC" | "DESC";
  filters?: Partial<TFilter>;
};

export type PaginationType = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type DatagridResponseType<T> = { rows: T[]; pagination: PaginationType };
