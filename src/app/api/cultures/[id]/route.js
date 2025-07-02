import { connectToDB } from "@/utils/db";
import Culture from "@/models/Culture"; // adjust if needed
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  await connectToDB();

  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const culture = await Culture.findById(id);
    if (!culture) {
      return NextResponse.json({ error: "Culture not found" }, { status: 404 });
    }

    return NextResponse.json(culture);
  } catch (err) {
    console.error("Error fetching culture:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
