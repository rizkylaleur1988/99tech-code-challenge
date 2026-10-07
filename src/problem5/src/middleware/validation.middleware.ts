import { NextFunction, Request, Response } from "express";
import { ContextRunner, validationResult } from "express-validator";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { ApiResponse } from "../utils/api-response.util.js";

/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

export const validation = (validations: ContextRunner[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const statusCode: StatusCodes = StatusCodes.UNPROCESSABLE_ENTITY;
      const groupedErrors = result.array().reduce((acc: Record<string, string[]>, err) => {
        const field = err.type === "field" ? err.path : "unknown";
        if (!acc[field]) acc[field] = [];
        acc[field].push(err.msg);
        return acc;
      }, {});
      const formatted = Object.fromEntries(Object.entries(groupedErrors).map(([key, messages]) => [key, messages.join(", ")]));
      const response = new ApiResponse().setCode(statusCode).setDescription(getReasonPhrase(statusCode)).setData(formatted);
      res.status(statusCode).json(response.response());
      return;
    }
    next();
  };
};
