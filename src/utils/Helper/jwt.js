import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "yoursecret";

// ✅ Sign a token with 2-hour expiry
export const signToken = (payload) => jwt.sign(payload, secret, { expiresIn: "2h" });

// ✅ Verify token
export const verifyToken = (token) => jwt.verify(token, secret);

// ✅ Get token from either header or cookie
export function getTokenFromRequest(req) {
  // ✅ 1. Try Authorization header
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  // ✅ 2. Try Cookie (Node Request object)
  const cookieHeader = req.headers.get("cookie");
  if (cookieHeader) {
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((c) => {
        const [k, v] = c.split("=");
        return [k, v];
      })
    );
    return cookies.token; // assuming you named the cookie `token`
  }

  return null;
}
