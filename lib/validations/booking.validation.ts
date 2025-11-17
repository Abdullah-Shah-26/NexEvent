import { z } from "zod";

export const bookingCreateSchema = z.object({
  eventId: z
    .string()
    .min(1, "Event ID is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid event ID format"),
  email: z
    .string()
    .email("Please provide a valid email address")
    .toLowerCase()
    .trim(),
});

export const bookingQuerySchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address")
    .toLowerCase()
    .trim()
    .optional(),
  eventId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid event ID format")
    .optional(),
});

export const bookingCancelSchema = z.object({
  bookingId: z
    .string()
    .min(1, "Booking ID is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid booking ID format"),
});

export type BookingCreateData = z.infer<typeof bookingCreateSchema>;
export type BookingQueryData = z.infer<typeof bookingQuerySchema>;
export type BookingCancelData = z.infer<typeof bookingCancelSchema>;
