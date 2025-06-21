import { GetUserByIdService } from "../service/get-user-by-id.js";
import { badRequest, ok, serverError } from "./helpers/httpHelpers.js";
import { invalidIdResponse } from "./helpers/userHelpers.js";
import validator from "validator";
import { PostgresGetUserById } from "../repositories/postgres/get-user-by-id.js";

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

      return serverError();
    }
  }
}
