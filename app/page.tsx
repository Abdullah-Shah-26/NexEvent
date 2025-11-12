import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function getFeaturedEvents(): Promise<IEvent[]> {
  try {
    if (!BASE_URL) {
      console.warn("BASE_URL is not defined");
      return [];
    }

    const response = await fetch(`${BASE_URL}/api/events`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      console.error("Failed to fetch events:", response.status);
      return [];
    }

    const { events } = await response.json();
    return events?.slice(0, 6) || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

const page = async () => {
  const featuredEvents = await getFeaturedEvents();

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
