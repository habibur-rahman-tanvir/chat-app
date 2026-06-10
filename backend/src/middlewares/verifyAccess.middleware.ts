import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface JwtUserPayload extends jwt.JwtPayload {
  _id: string;
  email: string;
}

const verifyAccess: RequestHandler = (req, res, next) => {
  const secret = process.env.JWT_SECRET || "jwt_secret";
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    [, token] = req.headers.authorization.split(" ");
  }
  if (!token) return res.status(401).set("X-Token-Expired", "true").end();
  let decoded;
  try {
    decoded = jwt.verify(token, secret) as JwtUserPayload;
  } catch (err) {
    return res.status(401).set("X-Token-Expired", "true").end();
  }
  req.user = {
    _id: decoded?._id,
    email: decoded?.email,
  };
  next();
};

export { verifyAccess };
