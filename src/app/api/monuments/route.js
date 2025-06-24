import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Monument from "@/models/Monument";

export async function GET() {
  try {
    await connectToDB();

    const monuments = await Monument.find({});
    return NextResponse.json(monuments, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error", message: error.message }, { status: 500 });
  }
}
