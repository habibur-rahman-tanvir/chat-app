import { logger } from "../configs/logger.js";

export const throwENVError = (message: string, varName?: string): never => {
  let msg: string;
  if (varName) {
    msg = `ErrorENV: ${message} :: <${varName}>`;
  } else {
    msg = `ErrorENV: ${message}`;
  }
  logger.error(msg);
  throw new Error(msg);
};
