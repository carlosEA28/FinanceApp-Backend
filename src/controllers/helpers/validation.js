import validator from "validator";
import { badRequest } from "../../controllers/helpers/httpHelpers.js";

export const checkIfIsString = (value) => typeof value === "string";

export const requiredFieldIsMissing = (field) =>
  badRequest({ message: `The field ${field} is missing` });

export const validateRequiredFields = (params, requiredFields) => {
  for (const field of requiredFields) {
    const fieldIsMissing = !params[field];
    const fieldIsEmpty =
      checkIfIsString(params[field]) &&
      validator.isEmpty(params[field], { ignore_whitespace: true });

    if (fieldIsMissing || fieldIsEmpty) {
      return {
        missingField: field,
        ok: false,
      };
    }
  }

  return {
    ok: true,
    missingField: undefined,
  };
};

export const checkIfAmountIsValid = (amount) => {
  return validator.isCurrency(amount.toString(), {
    digits_after_decimal: [2],
    allow_negatives: false,
    decimal_separator: ".",
  });
};
