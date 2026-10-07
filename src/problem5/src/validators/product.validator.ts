import { body, param, ValidationChain } from "express-validator";
import { ValidationMessages } from "../utils/validation.util.js";

/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

export const validateGetProductById: ValidationChain[] = [
  param("id").notEmpty().withMessage(ValidationMessages.REQUIRED).isNumeric().withMessage(ValidationMessages.MUST_BE_NUMBER),
];

export const validateDeleteProductById: ValidationChain[] = [
  param("id").notEmpty().withMessage(ValidationMessages.REQUIRED).isNumeric().withMessage(ValidationMessages.MUST_BE_NUMBER),
];

export const validateCreateProduct: ValidationChain[] = [
  body("name").notEmpty().withMessage(ValidationMessages.REQUIRED).isString().withMessage(ValidationMessages.MUST_BE_STRING),
  body("price").notEmpty().withMessage(ValidationMessages.REQUIRED).isNumeric().withMessage(ValidationMessages.MUST_BE_NUMBER),
];

export const validateUpdateProduct: ValidationChain[] = [
  param("id").notEmpty().withMessage(ValidationMessages.REQUIRED).isNumeric().withMessage(ValidationMessages.MUST_BE_NUMBER),
  body("name").notEmpty().withMessage(ValidationMessages.REQUIRED).isString().withMessage(ValidationMessages.MUST_BE_STRING),
  body("price").notEmpty().withMessage(ValidationMessages.REQUIRED).isNumeric().withMessage(ValidationMessages.MUST_BE_NUMBER),
];
