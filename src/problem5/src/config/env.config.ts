import dotenv from "dotenv";
import { EnvironmentEnum } from "../enums/environment.enum.js";

/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

dotenv.config();

// app
export const NODE_ENV: EnvironmentEnum = (process.env.NODE_ENV as EnvironmentEnum) ?? EnvironmentEnum.local;
export const APP_NAME: string = process.env.APP_NAME ?? "my-app";
export const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3000;
// database
export const DB_TIMEZONE: string = process.env.DB_TIMEZONE ?? "+00:00";
