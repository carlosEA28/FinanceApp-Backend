import { ZodError } from "zod";
import { createTransactionSchema } from "../../schemas/transactions.js";
import { serverError, badRequest, created } from "../helpers/httpHelpers.js";
import { UserNotFoundError } from "../../errors/user.js";
import { userNotFoundResponse } from "../helpers/userHelpers.js";

export class CreateTransactionController {
  constructor(createTransactionSerivce) {
    this.createTransactionSerivce = createTransactionSerivce;
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      await createTransactionSchema.parseAsync(params);

      const transaction = await this.createTransactionSerivce.execute(params);

      return created(transaction);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest({
          message: error.errors[0].message,
        });
      }

      if (error instanceof UserNotFoundError) {
        return userNotFoundResponse();
      }
      console.error(error);
      return serverError();
    }
  }
}
