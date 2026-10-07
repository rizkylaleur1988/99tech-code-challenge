import { body, param, ValidationChain } from "express-validator";
import { ValidationMessages } from "../utils/validation.util.js";

/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

const min: number = 1;
const max: number = 2147483647;

const id = param("id")
  .notEmpty()
  .withMessage(ValidationMessages.REQUIRED)
  .isInt({ min })
  .withMessage(ValidationMessages.MIN_VALUE(min))
  .isInt({ max })
  .withMessage(ValidationMessages.MAX_VALUE(max));

const name = body("name")
  .notEmpty()
  .withMessage(ValidationMessages.REQUIRED)
  .isString()
  .withMessage(ValidationMessages.MUST_BE_STRING)
  .isLength({ max: 255 })
  .withMessage(ValidationMessages.MAX_LENGTH(255));

const price = body("price")
  .notEmpty()
  .withMessage(ValidationMessages.REQUIRED)
  .isInt({ min })
  .withMessage(ValidationMessages.MIN_VALUE(min))
  .isInt({ max })
  .withMessage(ValidationMessages.MAX_VALUE(max));

export const validateGetProductById: ValidationChain[] = [id];

export const validateDeleteProductById: ValidationChain[] = [id];

export const validateCreateProduct: ValidationChain[] = [name, price];

export const validateUpdateProduct: ValidationChain[] = [id, name, price];
