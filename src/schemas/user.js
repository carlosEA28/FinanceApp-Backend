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
//partial mantem os campos de um certo schema
//strict garante que apenas os campos do schema sejam validados, se houver uma req com um campo fora do schema, da erro
export const updateUserSchema = createUserSchema
  .partial()
  .strict({ message: "Some provided fields not allowed" });

export const loginSchema = z.object({
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
