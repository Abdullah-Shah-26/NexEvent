import EventCard from "@/components/EventCard";
import SearchBar from "@/components/SearchBar";
import { IEvent } from "@/database";
import connectDB from "@/lib/mongoose";
import Event from "@/database/event.model";
import { ScrollProgress } from "@/components/motion-primitives/scroll-progress";

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
    ? events.filter((event: IEvent) => {
        const searchLower = search.toLowerCase();
        return (
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.location.toLowerCase().includes(searchLower) ||
          event.venue.toLowerCase().includes(searchLower) ||
          event.tags?.some((tag: string) =>
            tag.toLowerCase().includes(searchLower)
          )
        );
      })
    : events;

  return (
    <div>
      <ScrollProgress className="fixed top-0 z-50 bg-linear-to-r from-purple-500 to-pink-500" />
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
                No events found. Try adjusting your filters.
              </p>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
