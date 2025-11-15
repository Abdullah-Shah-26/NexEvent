"use client";
import { createBooking } from "@/lib/actions/booking.actions";
import posthog from "posthog-js";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AddToCalendar from "./AddToCalendar";

const BookEvent = ({
  eventId,
  slug,
  title,
  description,
  location,
  date,
  time,
}: {
  eventId: string;
  slug: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hasBooked, setHasBooked] = useState(false);
  const [isCheckingBooking, setIsCheckingBooking] = useState(true);

  const userRole = session?.user?.role || null;
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
  }, [session]);

  useEffect(() => {
    const checkExistingBooking = async () => {
      if (!session?.user?.email) {
        setIsCheckingBooking(false);
        return;
      }

      if (email && eventId) {
        setIsCheckingBooking(true);
        try {
          const response = await fetch(
            `/api/events/${slug}/bookings?email=${encodeURIComponent(email)}`
          );
          if (response.ok) {
            const data = await response.json();
            setHasBooked(data.hasBooked);
          }
        } catch (error) {
          console.error("Error checking booking:", error);
        } finally {
          setIsCheckingBooking(false);
        }
      } else {
        setIsCheckingBooking(false);
      }
    };

    checkExistingBooking();
  }, [email, eventId, slug, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please sign in to book this event", {
        duration: 3000,
      });
      setTimeout(() => {
        router.push(`/signin?callbackUrl=/events/${slug}`);
      }, 1000);
      return;
    }

    const result = await createBooking({ eventId, slug, email });

    if (result.success) {
      setSubmitted(true);
      toast.success("Event booked successfully!");

      if (posthog.__loaded) {
        posthog.capture("event_booked", {
          eventId,
          slug,
          email,
        });
      }
    } else {
      toast.error(result.message || "Booking failed. Please try again.");
    }
  };

  if (userRole === "organizer") {
    return null;
  }

  return (
    <aside className="booking">
      <div className="signup-card">
        <h2>Book Your Spot</h2>
        <p className="text-sm">Reserve your spot for this event</p>
        <div id="book-event">
          {submitted || hasBooked ? (
            <div className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                <p className="text-green-400 font-semibold text-lg mb-1">
                  ✓ Booked
                </p>
                <p className="text-sm text-gray-300">
                  You have successfully booked this event
                </p>
              </div>
              <AddToCalendar
                title={title}
                description={description}
                location={location}
                date={date}
                time={time}
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  placeholder="Enter your email address"
                  required
                  disabled={isCheckingBooking}
                />
              </div>
              <button
                type="submit"
                className="button-submit"
                disabled={isCheckingBooking}
              >
                {isCheckingBooking ? "Checking..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </aside>
  );
};

export default BookEvent;
