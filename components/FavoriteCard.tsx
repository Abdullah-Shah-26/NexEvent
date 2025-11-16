"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import FavoriteButton from "./FavoriteButton";

interface FavoriteCardProps {
  event: {
    _id: string;
    title: string;
    slug: string;
    image: string;
    date: string;
    time: string;
    description: string;
    tags: string[];
  };
}

export default function FavoriteCard({ event }: FavoriteCardProps) {
  return (
    <div className="bg-dark-100 border border-dark-200 rounded-lg overflow-hidden transition-all duration-300 group hover:opacity-80 relative">
      <div className="absolute top-3 right-3 z-10">
        <FavoriteButton eventId={event._id} initialFavorited={true} />
      </div>
      <Link href={`/events/${event.slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 transition-all duration-300 group-hover:bg-linear-to-r group-hover:from-[#c68bff] group-hover:via-[#8b55ff] group-hover:to-[#4f22ff] group-hover:bg-clip-text group-hover:text-transparent">
            {event.title}
          </h3>
          <div className="flex flex-col gap-2 text-light-200 text-sm mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 shrink-0" />
              <span>{event.time}</span>
            </div>
          </div>
          <p className="text-sm text-light-200 line-clamp-2">
            {event.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {event.tags.slice(0, 3).map((tag: string, idx: number) => (
              <span
                key={idx}
                className="text-xs bg-white/10 text-white px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
