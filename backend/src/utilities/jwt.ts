import jwt from "jsonwebtoken";
import { JWT_EXPIRE_TIME_MINUTES } from "../configs/config.js";

const jwt_secret = process.env.JWT_SECRET || "jwt_secret";

export const createToken = (payload: any) => {
  const token = jwt.sign(payload, jwt_secret, {
    noTimestamp: true,
    expiresIn: 60 * JWT_EXPIRE_TIME_MINUTES,
  });

  return token;
};
