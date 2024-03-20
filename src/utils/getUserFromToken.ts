import jwt from "jsonwebtoken";
import { JWT_KEY } from "../keys";

export const getUserFromToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_KEY) as { userId: number };
  } catch (error) {
    return null;
  }
};
