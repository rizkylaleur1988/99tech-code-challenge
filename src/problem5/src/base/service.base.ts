import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { ApiResponse } from "../utils/api-response.util.js";
import { ResponseType } from "../types/response.type.js";

/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

export abstract class Service {
  /**
   * @returns {ApiResponse}
   */
  apiResponse(): ApiResponse {
    return new ApiResponse();
  }

  /**
   * @protected
   * @param {StatusCodes} statusCode
   * @param {string} description
   * @returns {ResponseType}
   */
  protected buildResponse(statusCode: StatusCodes, description: string): ResponseType {
    const apiResponse = this.apiResponse().setCode(statusCode).setDescription(description);
    return { statusCode, data: apiResponse.response() };
  }

  /**
   * @protected
   * @param {string} description
   * @returns {ResponseType}
   */
  protected forbidden(description: string): ResponseType {
    return this.buildResponse(StatusCodes.FORBIDDEN, description);
  }

  /**
   * @protected
   * @param {string} description
   * @returns {ResponseType}
   */
  protected badRequest(description: string): ResponseType {
    return this.buildResponse(StatusCodes.BAD_REQUEST, description);
  }

  /**
   * @protected
   * @returns {ResponseType}
   */
  protected notFound(): ResponseType {
    return this.buildResponse(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
  }

  /**
   * @protected
   * @returns {ResponseType}
   */
  protected unauthorized(): ResponseType {
    return this.buildResponse(StatusCodes.UNAUTHORIZED, getReasonPhrase(StatusCodes.UNAUTHORIZED));
  }

  /**
   * @protected
   * @param {string} description
   * @returns {ResponseType}
   */
  protected conflict(description: string): ResponseType {
    return this.buildResponse(StatusCodes.CONFLICT, description);
  }

  /**
   * @protected
   * @param {string} description
   * @returns {ResponseType}
   */
  protected internalServerError(description: string): ResponseType {
    return this.buildResponse(StatusCodes.INTERNAL_SERVER_ERROR, description);
  }

  /**
   * @protected
   * @param {number} limit
   * @returns {ResponseType}
   */
  protected emptyDatagrid(limit: number): ResponseType {
    const statusCode: StatusCodes = StatusCodes.OK;
    const apiResponse = this.apiResponse()
      .setCode(statusCode)
      .setDescription(getReasonPhrase(statusCode))
      .setData([])
      .setPagination({ limit, page: 1, total: 0, totalPages: 1 });
    return { statusCode, data: apiResponse.response() };
  }
}
