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

      const requiredFields = ["user_id", "name", "date", "amount", "type"];

      for (const field of requiredFields) {
        if (!params[field] || params[field].toString().trim().length === 0) {
          return badRequest({ message: `Missing Param ${field}` });
        }
        const userIdIsValid = checkIfIdIsValid(params.user_id);

        if (!userIdIsValid) {
          return invalidIdResponse();
        }

        if (params.amount <= 0) {
          return badRequest();
        }

        const amountIsValid = validator.isCurrency(params.amount.toString(), {
          digits_after_decimal: [2],
          allow_negatives: false,
          decimal_separator: ".",
        });

        if (!amountIsValid) {
          return badRequest({
            message: "erro amount",
          });
        }

        const type = params.type.trim().toUpperCase();

        const typeIsValid = ["EARNING", "EXPENSE", "INVESTIMENT"].includes(
          type
        );

        if (!typeIsValid) {
          return badRequest({
            message: "erro tipo",
          });
        }

        const transaction = await this.createTransactionSerivce.execute({
          ...params,
          type,
        });

        return created(transaction);
      }
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
