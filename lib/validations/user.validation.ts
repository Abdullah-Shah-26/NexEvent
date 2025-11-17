import { z } from "zod";

export const userRegistrationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name cannot exceed 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please provide a valid email address")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password cannot exceed 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  role: z.enum(["guest", "organizer"], {
    message: "Role must be either 'guest' or 'organizer'",
  }),
});

export const userLoginSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address")
    .toLowerCase()
    .trim(),
  password: z.string().min(1, "Password is required"),
});

export const userUpdateSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name cannot exceed 100 characters")
    .trim()
    .optional(),
  email: z
    .string()
    .email("Please provide a valid email address")
    .toLowerCase()
    .trim()
    .optional(),
  role: z
    .enum(["guest", "organizer"], {
      message: "Role must be either 'guest' or 'organizer'",
    })
    .optional(),
});

export type UserRegistrationData = z.infer<typeof userRegistrationSchema>;
export type UserLoginData = z.infer<typeof userLoginSchema>;
export type UserUpdateData = z.infer<typeof userUpdateSchema>;
