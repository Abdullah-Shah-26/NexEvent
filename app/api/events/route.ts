import * as cloudinary from "cloudinary";
import connectDB from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Event from "../../../database/event.model";
import { validateEventFormData } from "@/lib/validations/server.validation";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const validation = validateEventFormData(formData);
    if (!validation.success) {
      return validation.error;
    }

    const file = formData.get("image") as File;
    if (!file) {
      return NextResponse.json(
        { message: "Image File is required" },
        { status: 400 }
      );
    }

    const validatedData = validation.data!;
    const { tags, agenda, ...eventData } = validatedData;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream(
          { resource_type: "image", folder: "DevEvent" },
          (error: Error | undefined, result: any) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });

    const createdEvent = await Event.create({
      ...eventData,
      image: uploadResult.secure_url,
      tags,
      agenda,
    });
    return NextResponse.json(
      { message: "Event created Successfully", event: createdEvent },
      { status: 201 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "Event creation Failed",
        error: e instanceof Error ? e.message : "Unknown",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Events Fetched SuccessFully", events },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Event Fetching Failed", error: e },
      { status: 500 }
    );
  }
}
