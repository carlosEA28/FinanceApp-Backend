import { badRequest } from "./httpHelpers.js";
import validator from "validator";

export const generateInvalidPassowordResponse = () => {
  return badRequest({
    message: "Password must be at least 6 characters",
  });
};

export const generateEmailAlreadyInUse = () => {
  return badRequest({
    message: "Invalid email. Please provide a valid one.",
  });
};

export const invalidIdResponse = () => {
  return badRequest({
    message: "The provided id is not valid",
  });
};

export const checkIfPasswordIsValid = (password) => password.length >= 6;

export const checkIfEmailIsValid = (email) => validator.isEmail(email);

export const checkIfIdIsValid = (id) => validator.isUUID(id);
