import { notFound } from "next/navigation";
import BookEvent from "@/components/BookEvent";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import EventCard from "@/components/EventCard";
import { GradientText } from "@/components/ui/gradient-text";
import EventDetails from "@/components/EventDetails";
import connectDB from "@/lib/mongoose";
import Event from "@/database/event.model";
import { ScrollProgress } from "@/components/motion-primitives/scroll-progress";

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

  const similarEvents = await getSimilarEventsBySlug(slug);

  return (
    <section id="event">
      <ScrollProgress className="fixed top-0 z-50 bg-linear-to-r from-purple-500 to-pink-500" />
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
