import express, { type Express, type Request, type Response } from "express";
import morgan from "morgan";
import { isProduction } from "./utilities/checkENV.js";
import { corsMiddleware } from "./middlewares/cors.middleware.js";

const app: Express = express();
app.set("trust proxy", 1);

app.use(corsMiddleware);

app.use(morgan("dev", { skip: () => isProduction() }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World");
});

export default app;
