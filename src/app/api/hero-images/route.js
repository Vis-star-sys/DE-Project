import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import HeroImage from "@/models/heroImage";

export async function GET() {
  try {
    await connectToDB();
    const images = await HeroImage.find();
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch images" }, { status: 500 });
  }
}
