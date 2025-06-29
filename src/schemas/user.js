import { z } from "zod";

export const createUserSchema = z.object({
  first_name: z.string().min(1, { message: "First Name is required" }),
  last_name: z.string().min(1, { message: "Last Name is required" }),

  email: z
    .string()
    .email({
      message: "Please provide an valid email ",
    })
    .trim()
    .min(1, { message: "Email is required" }),

  password: z
    .string()
    .trim()
    .min(6, { message: "Password must have at least 6 characters" }),
});
