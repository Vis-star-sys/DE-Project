import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import User from "@/models/User";

// ✅ CORRECT function signature
export async function GET(req, context) {
  try {
    await connectToDB();

     const { id } = await context.params; // ✅ No await needed

    const user = await User.findOne({ userId: id }).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in GET /api/user/[id]:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req, context) {
  try {
    await connectToDB();

    const { id } = await context.params; // 👈 dynamic userId like Kalpesh18
    const body = await req.json(); // 👈 updated data from frontend

    const updatedUser = await User.findOneAndUpdate(
      { userId: id }, // 👈 find user by userId (not _id)
      {
        name: body.name,
        email: body.email,
        contact: body.contact,
      },
      { new: true } // 👈 return updated document
    ).select("-password"); // 👈 never return password to frontend

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("❌ Error in PATCH /api/user/[id]:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}