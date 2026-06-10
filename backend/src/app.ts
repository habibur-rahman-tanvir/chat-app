import express, { type Express, type Request, type Response } from "express";
import morgan from "morgan";
import { isProduction } from "./utilities/checkENV.js";
import { corsMiddleware } from "./middlewares/cors.middleware.js";
import { authRouter } from "./routes/auth.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { healthRouter } from "./routes/health.route.js";

const app: Express = express();
app.set("trust proxy", 1);

app.use(corsMiddleware);

app.use(morgan("dev", { skip: () => isProduction() }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/health", healthRouter);

app.use(errorMiddleware);

export default app;
