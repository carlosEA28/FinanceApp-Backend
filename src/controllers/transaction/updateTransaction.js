import { updateTransactionSchema } from "../../schemas/transactions.js";
import { badRequest, ok, serverError } from "../helpers/httpHelpers.js";
import { checkIfIdIsValid, invalidIdResponse } from "../helpers/userHelpers.js";

export class UpdateTransactionController {
  constructor(updateTransactionService) {
    this.updateTransactionService = updateTransactionService;
  }
  async execute(httpRequest) {
    try {
      const idIsValid = checkIfIdIsValid(httpRequest.params.transactionId);

      if (!idIsValid) {
        return invalidIdResponse();
      }
      const params = httpRequest.body;

      await updateTransactionSchema.parseAsync(params);

      const transaction = await this.updateTransactionService.execute(
        httpRequest.params.transactionId,
        params
      );

      return ok(transaction);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest({
          message: error.errors[0].message,
        });
      }
      console.error(error);

      return serverError();
    }
  }
}
