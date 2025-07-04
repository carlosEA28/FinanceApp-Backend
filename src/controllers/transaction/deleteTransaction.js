import { ok, serverError } from "../helpers/httpHelpers.js";
import { checkIfIdIsValid, invalidIdResponse } from "../helpers/userHelpers.js";
import { transactionNotFoundResponse } from "../helpers/transaction.js";
import { TransactionNotFoundError } from "../../errors/transaction.js";

export class DeleteTransactionController {
  constructor(deleteTransactionSerivce) {
    this.deleteTransactionSerivce = deleteTransactionSerivce;
  }

  async execute(httpRequest) {
    try {
      const idIsValid = checkIfIdIsValid(httpRequest.params.transactionId);

      if (!idIsValid) {
        return invalidIdResponse();
      }

      const transaction = await this.deleteTransactionSerivce.execute(
        httpRequest.params.transactionId
      );

      if (!transaction) {
        return transactionNotFoundResponse();
      }

      return ok(transaction);
    } catch (error) {
      if (error instanceof TransactionNotFoundError) {
        return transactionNotFoundResponse();
      }

      console.error(error);
      return serverError();
    }
  }
}
