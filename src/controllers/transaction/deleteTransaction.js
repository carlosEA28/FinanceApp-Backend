import { ok, serverError } from "../helpers/httpHelpers.js";
import { checkIfIdIsValid, invalidIdResponse } from "../helpers/userHelpers.js";

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

      return ok(transaction);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
