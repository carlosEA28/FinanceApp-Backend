import { notFound } from "./httpHelpers.js";

export const transactionNotFoundResponse = () => {
  return notFound({
    message: "transaction not found",
  });
};
