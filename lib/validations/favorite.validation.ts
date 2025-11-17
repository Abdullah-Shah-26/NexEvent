import { z } from "zod";

export const favoriteCreateSchema = z.object({
  eventId: z
    .string()
    .min(1, "Event ID is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid event ID format"),
});

export const favoriteDeleteSchema = z.object({
  eventId: z
    .string()
    .min(1, "Event ID is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid event ID format"),
});

export const favoriteQuerySchema = z.object({
  userId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format")
    .optional(),
  eventId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid event ID format")
    .optional(),
});

export type FavoriteCreateData = z.infer<typeof favoriteCreateSchema>;
export type FavoriteDeleteData = z.infer<typeof favoriteDeleteSchema>;
export type FavoriteQueryData = z.infer<typeof favoriteQuerySchema>;
