import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/utils/Helper/jwt";
import { serialize } from "cookie";

export async function POST(req) {
  await connectToDB();

  try {
    const { userId, password } = await req.json();

    // ✅ Validate input
    if (!userId || !password) {
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
      });
    }

    // ✅ Check if user exists
    const user = await User.findOne({ userId });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // ✅ Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
      });
    }

    // ✅ Generate JWT token
    const token = signToken({ userId: user.userId });

    // ✅ Set cookie
    const serializedCookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    // ✅ Return response with cookie and user data
    return new Response(
      JSON.stringify({
        message: "Login successful",
        userId: user.userId,
        name: user.name,
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": serializedCookie,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
