import { app } from "./app.js";
import { database, testConnection } from "./config/database.config.js";
import { APP_NAME, NODE_ENV, PORT } from "./config/env.config.js";

/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

const bootstrap = async () => {
  try {
    app.listen(PORT, () => console.log(`🚀 ${APP_NAME} listening on port ${PORT} environment ${NODE_ENV}`));
    await testConnection();
    await database.sync();
  } catch (error) {
    console.error("error: ", error);
  }
};

void bootstrap();

process.on("unhandledRejection", (reason, promise) => console.error("Unhandled Rejection at: ", promise, "reason: ", reason));
