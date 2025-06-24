import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import Culture from "@/models/Culture";

export async function GET() {
    try{
        await connectToDB();
        const cultures = await Culture.find();
        return NextResponse.json(cultures);
    } catch(err){
        return NextResponse.json({message: "Faild to fatch data"}, {status: 500});
    }
}