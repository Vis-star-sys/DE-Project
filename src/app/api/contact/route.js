import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Contact from "@/models/Contact";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDB();

    const contact = new Contact({
      name: body.name,
      email: body.email,
      message: body.message,
    });

    await contact.save();

    return NextResponse.json({ message: "Message received successfully!" }, { status: 201 });
  } catch (err) {
    console.error("Error saving contact:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
