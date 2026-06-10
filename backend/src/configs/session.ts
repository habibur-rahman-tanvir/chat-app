import session from "express-session";
import MongoStore from "connect-mongo";
import { throwENVError } from "../utilities/util.js";
import { SESSION_EXPIRE_TIME_DAY } from "./config.js";

const session_secret = process.env.SESSION_SECRET;
const dataBaseUrl = process.env.DATABASE_URI;

if (!session_secret) {
  throwENVError("Session secret not found", "SESSION_SECRET");
}

if (!dataBaseUrl) throwENVError("Database url not found", "DATABASE_URI");

const mongoStore = MongoStore.create({
  mongoUrl: dataBaseUrl!,
  autoRemove: "native",
  collectionName: "session-data",
});

const userSession = session({
  secret: session_secret!,
  store: mongoStore,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * SESSION_EXPIRE_TIME_DAY,
  },
});

export { userSession };
