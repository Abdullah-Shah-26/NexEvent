import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";
import connectDB from "@/lib/mongoose";
import Event from "@/database/event.model";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getFeaturedEvents(): Promise<IEvent[]> {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 }).limit(6).lean();
    return JSON.parse(JSON.stringify(events)) as IEvent[];
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
