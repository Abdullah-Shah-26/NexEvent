"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { parse } from "date-fns";
import { toast } from "sonner";
import EventForm from "@/components/EventForm";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${slug}`);
        const { event } = await response.json();

        if (response.ok) {
          let tags: string[] = [];
          if (typeof event.tags === "string") {
            try {
              tags = JSON.parse(event.tags);
            } catch {
              tags = [];
            }
          } else if (Array.isArray(event.tags)) {
            tags = event.tags;
          }

          let agenda: string[] = [];
          if (typeof event.agenda === "string") {
            try {
              agenda = JSON.parse(event.agenda);
            } catch {
              agenda = [];
            }
          } else if (Array.isArray(event.agenda)) {
            agenda = event.agenda;
          }

          let eventDateTime: Date | undefined;
          if (event.date && event.time) {
            try {
              const dateTimeString = `${event.date} ${event.time}`;
              const parsedDate = parse(
                dateTimeString,
                "yyyy-MM-dd HH:mm",
                new Date()
              );
              if (!isNaN(parsedDate.getTime())) {
                eventDateTime = parsedDate;
              }
            } catch (error) {
              console.error("Error parsing date:", error);
            }
          }

          setInitialData({
            title: event.title || "",
            description: event.description || "",
            overview: event.overview || "",
            venue: event.venue || "",
            location: event.location || "",
            mode: event.mode || "",
            audience: event.audience || "",
            organizer: event.organizer || "",
            image: event.image || "",
            tags,
            agenda,
            eventDateTime,
          });
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Failed to load event data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/events/${slug}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (response.ok) {
        toast.success("Event updated successfully!", {
          description: "Redirecting to event page...",
        });
        setTimeout(() => router.push(`/events/${slug}`), 1500);
      } else {
        console.error("Update error:", data);
        toast.error("Failed to update event", {
          description: data.error || data.message || "Please try again",
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        description: "Please check your connection and try again",
      });
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="py-2">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="mb-4 text-white">Loading...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="py-2">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="mb-4">Edit Event</h1>
        {initialData && (
          <EventForm
            initialData={initialData}
            onSubmit={handleSubmit}
            submitLabel="Update Event"
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </main>
  );
}
