import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Booking from "@/database/booking.model";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ hasBooked: false }, { status: 200 });
    }

    await connectDB();

    const existingBooking = await Booking.findOne({
      slug,
      email: email.toLowerCase(),
    });

    return NextResponse.json({
      hasBooked: !!existingBooking,
    });
  } catch (error) {
    console.error("Error checking booking:", error);
    return NextResponse.json({ hasBooked: false }, { status: 200 });
  }
}
