import express from "express";
import {
  loginWithGoogle,
  logoutUser,
  refreshAccessToken,
} from "../controllers/auth.controller.js";
import { userSession } from "../configs/session.js";

const authRouter = express.Router();
authRouter.use(userSession);

authRouter.post("/google", loginWithGoogle);
authRouter.post("/logout", logoutUser);
authRouter.post("/refresh", refreshAccessToken);

export { authRouter };
