import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const page = async () => {
  let featuredEvents: IEvent[] = [];

  try {
    const response = await fetch(`${BASE_URL}/api/events`, {
      cache: "no-store",
    });

    if (response.ok) {
      const { events } = await response.json();
      featuredEvents = events?.slice(0, 6) || [];
    }
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }

  return (
    <div>
      <section>
        <h1 className="text-center">
          Discover The Events That Shape <br /> The Future of Developers
        </h1>
        <p className="text-center mt-5">
          Hackathons, Meetups, and Tech Conferences — All in One Place
        </p>

        <ExploreBtn />
        <div className="mt-20 space-y-7">
          <h3>Featured Events</h3>
          <ul className="events">
            {featuredEvents.length > 0 ? (
              featuredEvents.map((event: IEvent) => (
                <li key={event.title} className="list-none">
                  <EventCard {...event} />
                </li>
              ))
            ) : (
              <p className="text-center text-light-200">No events available</p>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default page;
