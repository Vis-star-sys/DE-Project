import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import Monument from "@/models/Monument";
import { connectToDB } from "@/utils/db";

export async function GET(req) {
  await connectToDB();

  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  const userCity = user.city || ""; // Add this field to user during signup

  const monuments = await Monument.find({
    location: { $regex: userCity, $options: "i" }
  }).limit(6);

  return NextResponse.json(monuments);
}
