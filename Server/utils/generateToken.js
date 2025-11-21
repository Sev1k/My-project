import crypto from "crypto";

export const generateToken = (length) => {
  return crypto.randomBytes(length).toString("hex");
};
