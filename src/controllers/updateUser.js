import { ZodError } from "zod";
import {
  badRequest,
  ok,
  serverError,
} from "../controllers/helpers/httpHelpers.js";
import { updateUserSchema } from "../schemas/user.js";

import { invalidIdResponse, checkIfIdIsValid } from "./helpers/userHelpers.js";
import { EmailAlreadyInUseError } from "../errors/user.js";

export class UpdateUserController {
  constructor(updateUserService) {
    this.updateUserService = updateUserService;
  }
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;

      const isIdValid = checkIfIdIsValid(userId);

      if (!isIdValid) {
        return invalidIdResponse();
      }
      const updateUserParams = httpRequest.body;

      await updateUserSchema.parseAsync(updateUserParams);

      const updatedUser = await this.updateUserService.execute(
        userId,
        updateUserParams
      );
      return ok(updatedUser);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest({
          message: error.errors[0].message,
        });
      }

      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({
          message: error.message,
        });
      }

      return serverError();
    }
  }
}
