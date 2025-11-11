"use client";
import { createBooking } from "@/lib/actions/booking.actions";
import posthog from "posthog-js";
import { useState } from "react";
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
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { success } = await createBooking({ eventId, slug, email });

    if (success) {
      setSubmitted(true);

      if (posthog.__loaded) {
        posthog.capture("event_booked", {
          eventId,
          slug,
          email,
        });
      }
    } else {
      console.error("Booking creation Failed");
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        <>
          <p className="text-sm">Thank you for signing up!</p>
          <AddToCalendar
            title={title}
            description={description}
            location={location}
            date={date}
            time={time}
          />
        </>
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
            ></input>
          </div>
          <button type="submit" className="button-submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
