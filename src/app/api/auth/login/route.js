import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/utils/Helper/jwt";

export async function POST(req) {
  await connectToDB();

  try {
    const { userId, password } = await req.json();

    if (!userId || !password) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    const user = await User.findOne({ userId });
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = signToken({ userId: user.userId });

    return Response.json(
      { message: "Login successful", token, userId: user.userId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
