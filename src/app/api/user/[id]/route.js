import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import User from "@/models/User";

export async function GET(req, { params }) {
  try {
    await connectToDB();
    const user = await User.findById(params.id).select("-password");
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
