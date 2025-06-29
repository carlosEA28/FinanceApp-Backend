import { ZodError } from "zod";
import { createTransactionSchema } from "../../schemas/transactions.js";
import { serverError, badRequest, created } from "../helpers/httpHelpers.js";
import { checkIfIdIsValid, invalidIdResponse } from "../helpers/userHelpers.js";
import validator from "validator";

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
      console.error(error);
      return serverError();
    }
  }
}
