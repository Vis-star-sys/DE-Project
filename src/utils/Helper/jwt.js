import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET || "yoursecret";

export const signToken = (payload) => jwt.sign(payload, secret, { expiresIn: "2h" });
export const verifyToken = (token) => jwt.verify(token, secret);

export function getTokenFromHeader(req) {
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
  return authHeader?.split(" ")[1];
}
