import { ok, serverError } from "../controllers/helpers/httpHelpers.js";
import { UserNotFoundError } from "../errors/user.js";
import {
  checkIfIdIsValid,
  invalidIdResponse,
  userNotFoundResponse,
} from "./helpers/userHelpers.js";

export class GetUserBalanceController {
  constructor(getUserBalanceService) {
    this.getUserBalanceService = getUserBalanceService;
  }

  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const idIsValid = checkIfIdIsValid(userId);

      console.log("Recebido userId:", httpRequest.params.userId);

      if (!idIsValid) {
        return invalidIdResponse();
      }

      const balance = await this.getUserBalanceService.execute({ userId });
      return ok(balance);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return userNotFoundResponse();
      }

      console.error();
      return serverError(error);
    }
  }
}
