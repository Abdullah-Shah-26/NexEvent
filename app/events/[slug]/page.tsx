import { notFound } from "next/navigation";
import BookEvent from "@/components/BookEvent";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import EventCard from "@/components/EventCard";
import { GradientText } from "@/components/ui/gradient-text";
import EventDetails from "@/components/EventDetails";
import connectDB from "@/lib/mongoose";
import Event from "@/database/event.model";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const EventPageDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  let event = null;
  try {
    await connectDB();
    event = await Event.findOne({ slug }).lean();
  } catch (error) {
    console.error("Error fetching event:", error);
  }

  if (!event) {
    return notFound();
  }

  const {
    description,
    image,
    overview,
    date,
    time,
    location,
    agenda,
    mode,
    audience,
    tags,
    organizer,
  } = event;

  const bookings = 10;

  const similarEvents = await getSimilarEventsBySlug(slug);

  return (
    <section id="event">
      <div className="header">
        <h1>
          <GradientText>Event Description</GradientText>
        </h1>
        <p>{description}</p>
      </div>

      <div className="details">
        <EventDetails
          image={image}
          overview={overview}
          date={date}
          time={time}
          location={location}
          mode={mode}
          audience={audience}
          agenda={agenda}
          organizer={organizer}
          tags={tags}
          eventId={event._id.toString()}
          slug={slug}
        />
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} people who have already booked their spot!{" "}
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot</p>
            )}

            <BookEvent
              eventId={event._id.toString()}
              slug={event.slug}
              title={event.title}
              description={description}
              location={location}
              date={date}
              time={time}
            />
          </div>
        </aside>
      </div>
      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>
          <GradientText>Similar Events</GradientText>
        </h2>
        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((similarEvent) => (
              <EventCard key={similarEvent.title} {...similarEvent} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default EventPageDetails;
