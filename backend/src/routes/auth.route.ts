import express from "express";
import {
  loginWithGoogle,
  refreshAccessToken,
} from "../controllers/auth.controller.js";
import { userSession } from "../configs/session.js";

const authRouter = express.Router();
authRouter.use(userSession);

authRouter.post("/google", loginWithGoogle);
authRouter.post("/refresh", refreshAccessToken);

export { authRouter };
