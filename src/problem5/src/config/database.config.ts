import { Sequelize } from "sequelize";
import { DB_TIMEZONE, NODE_ENV } from "./env.config.js";
import { EnvironmentEnum } from "../enums/environment.enum.js";

/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

interface IDatabaseConfig {
  timezone: string;
}

/**
 * @export
 * @returns {IDatabaseConfig}
 */
export function getDatabaseConfig(): IDatabaseConfig {
  return {
    timezone: DB_TIMEZONE,
  };
}

/**
 * @export
 * @param {IDatabaseConfig} [customConfig=getDatabaseConfig()]
 * @returns {Sequelize}
 */
export function createDatabase(customConfig: IDatabaseConfig = getDatabaseConfig()): Sequelize {
  return new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: NODE_ENV === EnvironmentEnum.local ? console.log : false,
    timezone: customConfig.timezone,
  });
}

export const database = createDatabase();

/**
 * @export
 * @async
 * @returns {Promise<void>}
 */
export async function testConnection(): Promise<void> {
  try {
    await database.authenticate();
    console.log("✅ SQLite connected");
  } catch (error) {
    console.error("❌ Failed connect database");
    console.error(error);
  }
}
