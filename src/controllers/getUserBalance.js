import { ok, serverError } from "../controllers/helpers/httpHelpers.js";
import { UserNotFoundError } from "../errors/user.js";
import { getUserBalanceSchema } from "../schemas/user.js";
import { userNotFoundResponse } from "./helpers/userHelpers.js";

export class GetUserBalanceController {
  constructor(getUserBalanceService) {
    this.getUserBalanceService = getUserBalanceService;
  }

  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const from = httpRequest.query.from;
      const to = httpRequest.query.to;

      await getUserBalanceSchema.parseAsync({
        user_id: userId,
        from,
        to,
      });

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
