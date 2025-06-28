import { serverError, badRequest, created } from "../helpers/httpHelpers";
import { checkIfIdIsValid, invalidIdResponse } from "../helpers/userHelpers";

export class CreateTransactionController {
  constructor(createTransactionSerivce) {
    this.createTransactionSerivce = createTransactionSerivce;
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const requiredFields = [
        "id",
        "user_id",
        "name",
        "date",
        "amount",
        "type",
      ];

      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length === 0) {
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
          return badRequest();
        }

        const type = params.type.trim().toUppercase();

        const typeIsValid = ["EARNING", "EXPENSE", "INVESTMENT"].includes(type);

        if (!typeIsValid) {
          return badRequest();
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
