"use server";
import connectDB from "../mongoose";
import { Booking } from "@/database";

export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectDB();

    const booking = await Booking.create({
      eventId,
      slug,
      email,
    });

    return {
      success: true,
    };
  } catch (e) {
    console.log("Create Booking Failed", e);
    return {
      success: false,
    };
  }
};
