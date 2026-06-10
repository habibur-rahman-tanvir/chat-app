import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";
import { oauth2client } from "../configs/google.config.js";
import axios from "axios";
import { User } from "../models/user/User.model.js";
import { createToken } from "../utilities/jwt.js";
import { JWT_EXPIRE_TIME_MINUTES } from "../configs/config.js";

export const loginWithGoogle: RequestHandler = async (req, res) => {
  const { code } = req.query;
  if (!code) throw new AppError("Google auth code not found", 400);

  try {
    const googleRes = await oauth2client.getToken(code as string);
    oauth2client.setCredentials(googleRes.tokens);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`,
    );
    const { name, email, picture } = userRes.data;

    const user = await User.findOne({ email }).lean();

    if (user) {
      const token = createToken({ _id: user._id, email });

      req.session.user = {
        _id: user._id,
        email: user.email,
      };

      return res.status(201).json({
        message: "User login success",
        token,
      });
    }

    const newUser = await User.create({ email, googleMeta: { name, picture } });

    const token = createToken({ _id: newUser._id, email });

    req.session.user = {
      _id: newUser._id,
      email: newUser.email,
    };

    return res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (err) {
    console.log("Err:", err);
    throw err;
  }
};

export const refreshAccessToken: RequestHandler = async (req, res) => {
  if (!req.session.user) throw new AppError("User not signed in", 401);

  const secret = process.env.JWT_SECRET || "jwt_secret";
  const token = jwt.sign(
    {
      _id: req.session.user?._id,
      email: req.session.user?.email,
    },
    secret,
    {
      noTimestamp: true,
      expiresIn: 60 * JWT_EXPIRE_TIME_MINUTES,
    },
  );

  res.setHeader("X-Access-Token", token);

  res.status(200).json({
    status: "success",
    accessToken: token,
  });
};
