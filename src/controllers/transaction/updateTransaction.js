import { badRequest, ok, serverError } from "../helpers/httpHelpers.js";
import { checkIfIdIsValid, invalidIdResponse } from "../helpers/userHelpers.js";
import { checkIfAmountIsValid } from "../helpers/validation.js";

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
      const allowedFields = ["name", "data", "amount", "type"];

      const someFieldIsNotAllowed = Object.keys(params).some(
        (field) => !allowedFields.includes(field)
      );

      if (someFieldIsNotAllowed) {
        return badRequest({ message: "Some provided field is not allowes" });
      }

      if (params.amount) {
        const amountIsValid = checkIfAmountIsValid(params.amount);
        if (!amountIsValid) {
          throw new Error("Invalid amount");
        }
      }

      if (params.type) {
        const type = params.type.trim().toUpperCase();

        const typeIsValid = ["EARNING", "EXPENSE", "INVESTIMENT"].includes(
          type
        );

        if (!typeIsValid) {
          throw new Error("Invalid Type");
        }
      }

      const transaction = await this.updateTransactionService.execute(
        httpRequest.params.transactionId,
        params
      );

      return ok(transaction);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
