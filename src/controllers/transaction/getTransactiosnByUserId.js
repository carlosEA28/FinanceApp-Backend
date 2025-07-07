import { ZodError } from "zod";
import { UserNotFoundError } from "../../errors/user.js";
import { getTransactionsByUserIdSchema } from "../../schemas/transactions.js";
import { badRequest, ok } from "../helpers/httpHelpers.js";

export class GetTransactiosByUserIdController {
  constructor(getTransactiosByUserIdService) {
    this.getTransactiosByUserIdService = getTransactiosByUserIdService;
  }
  async execute(httpRequest) {
    try {
      const userId = httpRequest.query.userId;
      const from = httpRequest.query.from;
      const to = httpRequest.query.to;

      await getTransactionsByUserIdSchema.parseAsync({
        userId: userId,
        from: from,
        to: to,
      });

      const transactions = await this.getTransactiosByUserIdService.execute(
        userId,
        from,
        to
      );

      return ok(transactions);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return UserNotFoundError();
      }
      console.log(error);

      if (error instanceof ZodError) {
        return badRequest({
          message: error.errors[0].message,
        });
      }
    }
  }
}
