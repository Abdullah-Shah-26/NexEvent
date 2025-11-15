"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EventForm from "@/components/EventForm";

export default function CreateEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Event created successfully!", {
          description: "Redirecting to events page...",
        });
        setTimeout(() => router.push("/events"), 1500);
      } else {
        toast.error("Failed to create event", {
          description: data.message || "Please try again",
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        description: "Please check your connection and try again",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="py-2">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="mb-4">Add New Event</h1>
        <EventForm
          onSubmit={handleSubmit}
          submitLabel="Add Event"
          isSubmitting={isSubmitting}
        />
      </div>
    </main>
  );
}
