import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDB } from "@/utils/db";
import Monument from "@/models/Monument";

export async function GET(request, { params }) {
  try {
    await connectToDB();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const monument = await Monument.findById(id);

    if (!monument) {
      return NextResponse.json({ error: "Monument not found" }, { status: 404 });
    }

    return NextResponse.json(monument, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error", message: error.message }, { status: 500 });
  }
}
