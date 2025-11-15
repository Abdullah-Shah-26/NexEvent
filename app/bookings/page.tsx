import { auth } from "@/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongoose";
import { Booking, Event, User } from "@/database";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import CancelBookingButton from "@/components/CancelBookingButton";

export default async function BookingsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/select-role");
  }

  await connectDB();

  const user = await User.findOne({ email: session.user.email }).lean();

  if (!user || user.role !== "guest") {
    redirect("/");
  }

  const bookings = await Booking.find({ email: user.email })
    .populate("eventId")
    .sort({ createdAt: -1 })
    .lean();

  const bookingsWithEvents = bookings.filter((booking) => booking.eventId);

  return (
    <main>
      <h1 className="mb-8">My Bookings</h1>

      {bookingsWithEvents.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-light-200 text-xl mb-6">
            You haven't booked any events yet
          </p>
          <Link
            href="/events"
            className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookingsWithEvents.map((booking: any) => {
            const event = booking.eventId;
            return (
              <div
                key={booking._id.toString()}
                className="bg-dark-100 border-dark-200 rounded-lg p-4 sm:p-6 hover:border-purple-400 transition-colors duration-300"
              >
                <Link href={`/events/${event.slug}`} className="block mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                    {event.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-light-200 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 shrink-0" />
                      <span>Event: {event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 shrink-0" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    <span>Booked on </span>
                    <span className="font-semibold text-white">
                      {new Date(booking.createdAt).toLocaleDateString("en-CA")}
                    </span>
                  </div>
                </Link>
                <div className="flex justify-end pt-3 border-t border-white/10">
                  <CancelBookingButton bookingId={booking._id.toString()} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
