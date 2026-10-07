import { Router, type Request, type Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { ApiResponse } from "../utils/api-response.util.js";
import { api } from "./api.route.js";

/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

const router = Router();

router.get(["/", "/api/health-check"], (req: Request, res: Response): void => {
  const apiResponse = new ApiResponse();
  const response = apiResponse.setCode(StatusCodes.OK).setDescription(getReasonPhrase(StatusCodes.OK)).response();
  res.status(StatusCodes.OK).json(response);
});

router.use("/api", api);

router.all("/*path", (req: Request, res: Response): void => {
  const apiResponse = new ApiResponse();
  const response = apiResponse.setCode(StatusCodes.NOT_FOUND).setDescription(getReasonPhrase(StatusCodes.NOT_FOUND)).response();
  res.status(StatusCodes.NOT_FOUND).json(response);
});

export { router };
