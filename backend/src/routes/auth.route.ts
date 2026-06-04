import express from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/refresh", refreshAccessToken);

export { authRouter };
