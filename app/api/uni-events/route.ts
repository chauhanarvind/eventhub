import EventFormData from "@/app/lib/eventFormData";
import dbConnect from "@/app/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Document } from "mongoose";

interface EventDocument extends EventFormData, Document {}

const UniEventSchema = new mongoose.Schema<EventDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  time: { type: String, required: true }, // Make sure time is a string in ISO format
  source: { type: String, required: true },
  imageUrl: {
    type: String,
    default: null, // Can be null or a string
    required: false,
  },
  category: {
    type: String,
    default: null, // Can be null or a string
    required: false,
  },
  link: {
    type: String,
    default: null, // Can be null or a string
    required: false,
  },
});

const UniEvent =
  mongoose.models.UniEvent ||
  mongoose.model("UniEvent", UniEventSchema, "unievents");

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json(); // Parse the request body
    const event = new UniEvent(body);

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
