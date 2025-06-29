import { UserNotFoundError } from "../../errors/user.js";
import { ok } from "../helpers/httpHelpers.js";
import { checkIfIdIsValid, invalidIdResponse } from "../helpers/userHelpers.js";
import { requiredFieldIsMissing } from "../helpers/validation.js";

export class GetTransactiosByUserIdController {
  constructor(getTransactiosByUserIdService) {
    this.getTransactiosByUserIdService = getTransactiosByUserIdService;
  }
  async execute(httpRequest) {
    try {
      const userId = httpRequest.query.userId;

      if (!userId) {
        return requiredFieldIsMissing("userId");
      }

      const userIdIsValid = checkIfIdIsValid(userId);

      if (!userIdIsValid) {
        return invalidIdResponse();
      }

      const transactions = await this.getTransactiosByUserIdService.execute({
        userId: userId,
      });

      return ok(transactions);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return UserNotFoundError();
      }
      console.log(error);
    }
  }
}
