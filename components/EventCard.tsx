import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, Clock } from "lucide-react";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({ title, image, slug, location, date, time }: Props) => {
  const imageSrc = image || "/images/event-full.png";

  return (
    <Link href={`/events/${slug}`} id="event-card">
      <Image
        src={imageSrc}
        alt={title}
        width={410}
        height={300}
        className="poster"
        unoptimized
        loading="lazy"
      />
      <div className="flex flex-row gap-2">
        <MapPin className="w-3.5 h-3.5" />
        <p>{location}</p>
      </div>

      <p className="title">{title} </p>
      <div className="datetime">
        <div>
          <Calendar className="w-3.5 h-3.5" />
          <p>{date}</p>
          <Clock className="w-3.5 h-3.5" />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
