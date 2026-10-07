/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

export const ValidationMessages = {
  // General
  REQUIRED: "Field is required",
  INVALID: "Invalid value",
  NOT_EMPTY: "Field must not be empty",

  // String
  MUST_BE_STRING: "Must be a string",
  MIN_LENGTH: (min: number) => `Minimum length is ${min}`,
  MAX_LENGTH: (max: number) => `Maximum length is ${max}`,
  LENGTH_BETWEEN: (min: number, max: number) => `Length must be between ${min} and ${max}`,
  INVALID_EMAIL: "Invalid email format",
  INVALID_URL: "Invalid URL format",

  // Number
  MUST_BE_NUMBER: "Must be a number",
  MIN_VALUE: (min: number) => `Minimum value is ${min}`,
  MAX_VALUE: (max: number) => `Maximum value is ${max}`,
  POSITIVE_NUMBER: "Must be a positive number",
  INTEGER_REQUIRED: "Must be an integer",

  // Boolean
  INVALID_BOOLEAN: "Invalid boolean value",

  // Date
  INVALID_DATE: "Invalid date format",

  // Array
  MUST_BE_ARRAY: "Must be an array",
  ARRAY_NOT_EMPTY: "Array must not be empty",

  // Object
  MUST_BE_OBJECT: "Must be an object",

  // Auth / Security related
  INVALID_TOKEN: "Invalid token",
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Forbidden access",

  // Custom business
  ALREADY_EXISTS: "Data already exists",
  NOT_FOUND: "Data not found",
};
