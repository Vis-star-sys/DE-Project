import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Monument from "@/models/Monument";

export async function GET() {
  await connectToDB();
  const monuments = await Monument.find().sort({ createdAt: -1 }).limit(6);
  return NextResponse.json(monuments);
}
