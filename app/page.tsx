import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const page = async () => {
  const response = await fetch(`${BASE_URL}/api/events`, {
    cache: "no-store",
  });
  const { events } = await response.json();

  const featuredEvents = events?.slice(0, 6) || [];

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
