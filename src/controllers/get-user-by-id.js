import { ok, serverError } from "./helpers/httpHelpers.js";
import {
  invalidIdResponse,
  userNotFoundResponse,
} from "./helpers/userHelpers.js";
import validator from "validator";

export class GetUserByIdController {
  constructor(getUserByIdService) {
    this.getUserByIdService = getUserByIdService;
  }
  async execute(httpRequest) {
    try {
      const isIdValid = validator.isUUID(httpRequest.params.userId);
      if (!isIdValid) {
        return invalidIdResponse();
      }

      const user = await this.getUserByIdService.execute(
        httpRequest.params.userId
      );

      return ok(user);
    } catch (error) {
      console.log(error);

      if (error instanceof userNotFoundResponse()) {
        return userNotFoundResponse();
      }

      return serverError();
    }
  }
}
