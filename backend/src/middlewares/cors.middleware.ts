import cors from "cors";
import { EXPOSED_HEADERS, WHITE_LIST } from "../configs/cors.config.js";
import { AppError } from "../errors/AppError.js";
import { logger } from "../configs/logger.js";

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (WHITE_LIST.includes(origin)) {
      callback(null, true);
    } else {
      logger.warn("BLOCKED_ORIGIN:", origin);
      callback(new AppError("Not alowed by CORS"));
    }
  },
  credentials: true,
  exposedHeaders: EXPOSED_HEADERS,
});
