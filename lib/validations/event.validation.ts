import { z } from "zod";

export const eventSchema = z.object({
  title: z
    .string()
    .min(3, "Event title must be at least 3 characters long")
    .max(200, "Event title must not exceed 200 characters"),

  organizer: z
    .string()
    .min(2, "Organizer name must be at least 2 characters long"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),

  overview: z.string().min(10, "Overview must be at least 10 characters long"),

  venue: z.string().min(2, "Venue name must be at least 2 characters long"),

  location: z.string().min(2, "Location must be at least 2 characters long"),

  date: z.string().min(1, "Date is required"),

  time: z.string().min(1, "Time is required"),

  mode: z.enum(["offline", "online", "hybrid"], {
    message: "Please select a valid event mode",
  }),

  audience: z.string().min(2, "Audience must be at least 2 characters long"),

  tags: z
    .array(z.string())
    .min(1, "Please add at least one tag")
    .max(10, "You can add a maximum of 10 tags"),

  agenda: z
    .array(z.string())
    .min(1, "Please add at least one agenda item")
    .max(20, "You can add a maximum of 20 agenda items"),
});

export const tagSchema = z
  .string()
  .min(2, "Tag must be at least 2 characters long");

export const agendaItemSchema = z
  .string()
  .min(5, "Agenda item must be at least 5 characters long");

export const imageSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Please upload an event image")
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Image size must not exceed 5MB"
    )
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        ),
      "Only JPEG, PNG, and WebP images are allowed"
    ),
});

export type EventFormData = z.infer<typeof eventSchema>;
