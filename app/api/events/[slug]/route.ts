import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Event from "@/database/event.model";
import { User } from "@/database";
import * as cloudinary from "cloudinary";
import { validateEventFormData } from "@/lib/validations/server.validation";
import { auth } from "@/auth";

// Debug: Log Cloudinary config
console.log("=== Cloudinary Configuration ===");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log(
  "API Secret:",
  process.env.CLOUDINARY_API_SECRET
    ? "***" + process.env.CLOUDINARY_API_SECRET.slice(-4)
    : "undefined"
);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { message: "Invalid slug parameter" },
        { status: 400 }
      );
    }

    const sanitizedSlug = slug.trim().toLowerCase();

    if (sanitizedSlug.length === 0) {
      return NextResponse.json(
        { message: "Slug cannot be empty" },
        { status: 400 }
      );
    }

    await connectDB();

    const event = await Event.findOne({ slug: sanitizedSlug }).lean();

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Event fetched successfully",
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching event by slug:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Authentication check
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { message: "Invalid slug parameter" },
        { status: 400 }
      );
    }

    const sanitizedSlug = slug.trim().toLowerCase();

    if (sanitizedSlug.length === 0) {
      return NextResponse.json(
        { message: "Slug cannot be empty" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user || user.role !== "organizer") {
      return NextResponse.json(
        { message: "Forbidden: Only organizers can delete events" },
        { status: 403 }
      );
    }

    const existingEvent = await Event.findOne({ slug: sanitizedSlug });

    if (!existingEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    const deletedEvent = await Event.findOneAndDelete({ slug: sanitizedSlug });

    return NextResponse.json(
      {
        message: "Event deleted successfully",
        event: deletedEvent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting event:", error);

    return NextResponse.json(
      {
        message: "Failed to delete event",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Authentication check
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { message: "Invalid slug parameter" },
        { status: 400 }
      );
    }

    const sanitizedSlug = slug.trim().toLowerCase();

    if (sanitizedSlug.length === 0) {
      return NextResponse.json(
        { message: "Slug cannot be empty" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user is an organizer
    const user = await User.findOne({ email: session.user.email });
    if (!user || user.role !== "organizer") {
      return NextResponse.json(
        { message: "Forbidden: Only organizers can edit events" },
        { status: 403 }
      );
    }

    // Fetch existing event
    const existingEvent = await Event.findOne({ slug: sanitizedSlug });

    if (!existingEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    const formData = await req.formData();

    const validation = validateEventFormData(formData);
    if (!validation.success) {
      console.error("Validation failed:", validation.error);
      return validation.error;
    }

    const validatedData = validation.data!;
    const { tags, agenda, ...eventData } = validatedData;
    const updateData: any = { ...eventData, tags, agenda };

    const file = formData.get("image") as File;
    if (file && file.size > 0) {
      try {
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

        updateData.image = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return NextResponse.json(
          {
            message: "Failed to upload image",
            error:
              uploadError instanceof Error
                ? uploadError.message
                : "Unknown error",
          },
          { status: 500 }
        );
      }
    }

    const updatedEvent = await Event.findOneAndUpdate(
      { slug: sanitizedSlug },
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      {
        message: "Event updated successfully",
        event: updatedEvent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating event:", error);

    return NextResponse.json(
      {
        message: "Failed to update event",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
