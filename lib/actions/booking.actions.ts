"use server";
import connectDB from "../mongoose";
import { Booking } from "@/database";
import { auth } from "@/auth";

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
    const session = await auth();

    if (!session?.user?.email) {
      return {
        success: false,
        message: "You must be signed in to book an event",
      };
    }

    if (session.user.email.toLowerCase() !== email.toLowerCase()) {
      return {
        success: false,
        message: "Email mismatch. Please use your account email.",
      };
    }

    await connectDB();

    const existingBooking = await Booking.findOne({
      eventId,
      email: email.toLowerCase(),
    });

    if (existingBooking) {
      return {
        success: false,
        message: "You have already booked this event",
      };
    }

    const booking = await Booking.create({
      eventId,
      slug,
      email: email.toLowerCase(),
    });

    return {
      success: true,
      message: "Booking created successfully",
    };
  } catch (e) {
    return {
      success: false,
      message: "Failed to book event",
    };
  }
};

export const cancelBooking = async (bookingId: string) => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return {
        success: false,
        message: "You must be signed in to cancel a booking",
      };
    }

    await connectDB();

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return {
        success: false,
        message: "Booking not found",
      };
    }

    if (booking.email.toLowerCase() !== session.user.email.toLowerCase()) {
      return {
        success: false,
        message: "You can only cancel your own bookings",
      };
    }

    await Booking.findByIdAndDelete(bookingId);

    return {
      success: true,
      message: "Booking cancelled successfully",
    };
  } catch (e) {
    return {
      success: false,
      message: "Failed to cancel booking",
    };
  }
};
