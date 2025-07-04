import { z } from "zod";
import validator from "validator";

export const createTransactionSchema = z.object({
  user_id: z.string().uuid(),
  name: z.string().trim().min(1, {
    message: "Name is required",
  }),

  date: z.coerce.date(),
  type: z.enum(["EARNING", "EXPENSE", "INVESTIMENT"]),
  amount: z
    .number()
    .min(1, { message: "Amount must be greater than 0" })
    .refine(
      (value) =>
        validator.isCurrency(value.toFixed(2), {
          digits_after_decimal: [2],
          allow_negatives: false,
          decimal_separator: ".",
        }),
      {
        message: "Amount must be a valid currency with 2 decimal digits",
      }
    ),
});

export const updateTransactionSchema = createTransactionSchema
  .omit({
    user_id: true,
  })
  .partial()
  .strict({
    message: "Some provided fields are not allowed",
  });
