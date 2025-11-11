import EventCard from "@/components/EventCard";
import SearchBar from "@/components/SearchBar";
import { IEvent } from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) => {
  const { search } = await searchParams;

  const response = await fetch(`${BASE_URL}/api/events`, {
    cache: "no-store",
  });
  const { events } = await response.json();

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
