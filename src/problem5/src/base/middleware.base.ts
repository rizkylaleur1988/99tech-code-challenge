import { NextFunction, Request, Response } from "express";

/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

export abstract class Middleware {
  abstract handle(errOrReq: Error | Request, reqOrRes: Request | Response, resOrNext: Response | NextFunction, next?: NextFunction): void;
}
