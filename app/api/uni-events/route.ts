import dbConnect from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Event from "../../models/uni-events";
import EventFormData from "@/app/interface/eventFormData";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json(); // Parse the request body
    const event = new Event(body);

    // Perform validation before saving
    const validationError = event.validateSync();
    if (validationError) {
      console.error("Validation error:", validationError);
      return NextResponse.json(
        { message: "Validation failed", details: validationError.errors },
        { status: 400 }
      );
    }

    await event.save(); // Save the document
    return NextResponse.json(
      { message: "University event saved successfully", event },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Error saving university event", details: error.message },
      { status: 400 }
    );
  }
}

export async function GET() {
  await dbConnect();

  try {
    const events: EventFormData[] = await Event.find().exec();

    return NextResponse.json(events, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { messgae: "Error fetching events", details: error.message },
      { status: 500 }
    );
  }
}
