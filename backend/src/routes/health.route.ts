import express from "express";
import { verifyAccess } from "../middlewares/verifyAccess.middleware.js";

const healthRouter = express.Router();

healthRouter.get("/check", verifyAccess, (req, res) => {
  res.send("Your login");
});

export { healthRouter };
