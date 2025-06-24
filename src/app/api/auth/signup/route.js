import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectToDB();

  try {
    const { name, userId, email, contact, password } = await req.json();

    if (!name || !userId || !email || !contact || !password) {
      return Response.json({ error: "All fields are required" }, { status: 422 });
    }

    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return Response.json({ error: "UserId already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      userId,
      email,
      contact,
      password: hashedPassword,
    });

    return Response.json(
      { message: "Registered successfully", userId: newUser.userId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
