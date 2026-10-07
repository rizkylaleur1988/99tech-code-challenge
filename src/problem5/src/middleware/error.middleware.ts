import { NextFunction, Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { Middleware } from "../base/middleware.base.js";
import { ApiResponse } from "../utils/api-response.util.js";

/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

export class ErrorMiddleware extends Middleware {
  private readonly apiResponse: ApiResponse;

  constructor() {
    super();
    this.apiResponse = new ApiResponse();
  }

  /**
   * @param {Error} err
   * @param {Request} req
   * @param {Response} res
   * @param {?NextFunction} [_next]
   */
  handle(err: Error, req: Request, res: Response, _next?: NextFunction): void {
    this.apiResponse.setCode(StatusCodes.INTERNAL_SERVER_ERROR).setDescription(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(this.apiResponse.response());
  }
}
