import { auth } from "@/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongoose";
import { Favorite, User } from "@/database";
import Link from "next/link";
import { Heart } from "lucide-react";
import FavoriteCard from "@/components/FavoriteCard";

export default async function FavoritesPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/signin");
  }

  await connectDB();

  const user = await User.findOne({ email: session.user.email }).lean();

  if (!user) {
    redirect("/");
  }

  const favorites = await Favorite.find({ userId: user._id })
    .populate("eventId")
    .sort({ createdAt: -1 })
    .lean();

  const favoritesWithEvents = favorites.filter((fav) => fav.eventId);

  return (
    <main>
      <h1 className="mb-8">My Favourites</h1>

      {favoritesWithEvents.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="w-16 h-16 text-light-200 mx-auto mb-4" />
          <p className="text-light-200 text-xl mb-6">
            You haven't favourited any events yet
          </p>
          <Link
            href="/events"
            className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritesWithEvents.map((favorite: any) => {
            const event = favorite.eventId;
            return (
              <FavoriteCard
                key={favorite._id.toString()}
                event={{
                  _id: event._id.toString(),
                  title: event.title,
                  slug: event.slug,
                  image: event.image,
                  date: event.date,
                  time: event.time,
                  description: event.description,
                  tags: event.tags,
                }}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}
