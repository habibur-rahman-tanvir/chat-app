import type { RequestHandler } from "express";

export const loginUser: RequestHandler = async (req, res) => {
  res.send("Login user");
};

export const logoutUser: RequestHandler = async (req, res) => {
  res.send("Logout user");
};

export const refreshAccessToken: RequestHandler = async (req, res) => {
  res.send("Refresh Access Token");
};
