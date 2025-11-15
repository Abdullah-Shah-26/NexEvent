"use client";

import Image from "next/image";
import { Calendar, Clock, MapPin, Monitor, Users } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import EventActions from "@/components/EventActions";

interface EventDetailsProps {
  image: string;
  overview: string;
  date: string;
  time: string;
  location: string;
  mode: string;
  audience: string;
  agenda: string[] | string;
  organizer: string;
  tags: string[] | string;
  eventId: string;
  slug: string;
}

const EventDetailItem = ({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Icon className="w-4 h-4" />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] | string }) => {
  let itemsArray: string[] = [];

  if (typeof agendaItems === "string") {
    try {
      itemsArray = JSON.parse(agendaItems);
    } catch {
      itemsArray = [];
    }
  } else if (Array.isArray(agendaItems)) {
    itemsArray = agendaItems;
  }

  return (
    <div className="agenda">
      <h2>
        <GradientText>Agenda</GradientText>
      </h2>
      <ul>
        {itemsArray.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const EventTags = ({ tags }: { tags: string[] | string }) => {
  let tagArray: string[] = [];

  if (typeof tags === "string") {
    try {
      tagArray = JSON.parse(tags);
    } catch {
      tagArray = [];
    }
  } else if (Array.isArray(tags)) {
    tagArray = tags;
  }

  return (
    <div className="flex flex-row gap-1.5 flex-wrap">
      {tagArray.map((tag, index) => (
        <div className="pill" key={`${tag}-${index}`}>
          {tag}
        </div>
      ))}
    </div>
  );
};

export default function EventDetails({
  image,
  overview,
  date,
  time,
  location,
  mode,
  audience,
  agenda,
  organizer,
  tags,
  eventId,
  slug,
}: EventDetailsProps) {
  return (
    <div className="content">
      <Image
        src={image}
        alt="Event Banner"
        width={800}
        height={800}
        className="banner"
      />

      <section className="flex-col-gap-2">
        <h2>
          <GradientText>Overview</GradientText>
        </h2>
        <p>{overview}</p>
      </section>

      <section className="flex-col-gap-2">
        <h2>
          <GradientText>Event Details</GradientText>
        </h2>

        <EventDetailItem icon={Calendar} label={date} />
        <EventDetailItem icon={Clock} label={time} />
        <EventDetailItem icon={MapPin} label={location} />
        <EventDetailItem
          icon={Monitor}
          label={mode.charAt(0).toUpperCase() + mode.slice(1)}
        />
        <EventDetailItem icon={Users} label={audience} />
      </section>

      <EventAgenda agendaItems={agenda} />

      <section className="flex-col-gap-2">
        <h2>
          <GradientText>About the Organizer</GradientText>
        </h2>
        <p>{organizer}</p>
      </section>

      <EventTags tags={tags} />

      <EventActions eventId={eventId} slug={slug} />
    </div>
  );
}
