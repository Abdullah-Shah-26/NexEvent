import EventCard from "@/components/EventCard";
import SearchBar from "@/components/SearchBar";
import { IEvent } from "@/database";
import connectDB from "@/lib/mongoose";
import Event from "@/database/event.model";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const EventsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) => {
  const { search } = await searchParams;

  let events: IEvent[] = [];
  try {
    await connectDB();
    const dbEvents = await Event.find().sort({ createdAt: -1 }).lean();
    events = JSON.parse(JSON.stringify(dbEvents)) as IEvent[];
  } catch (error) {
    console.error("Error fetching events:", error);
  }

  const filteredEvents = search
    ? events.filter(
        (event: IEvent) =>
          event.title.toLowerCase().includes(search.toLowerCase()) ||
          event.description.toLowerCase().includes(search.toLowerCase()) ||
          event.tags?.some((tag: string) =>
            tag.toLowerCase().includes(search.toLowerCase())
          )
      )
    : events;

  return (
    <div>
      <section>
        <h1 className="text-center">All Events</h1>
        <p className="text-center mt-5">
          Discover and explore all upcoming tech events
        </p>

        <SearchBar />

        <div className="mt-20 space-y-7">
          <h3>
            {search
              ? `Search Results for "${search}" (${filteredEvents.length})`
              : `All Events [${filteredEvents.length}]`}
          </h3>
          <ul className="events">
            {filteredEvents && filteredEvents.length > 0 ? (
              filteredEvents.map((event: IEvent) => (
                <li key={event.title} className="list-none">
                  <EventCard {...event} />
                </li>
              ))
            ) : (
              <p className="text-center text-light-200">
                No events found. Try a different search term.
              </p>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
