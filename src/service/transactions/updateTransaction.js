import { ForbidenError } from "../../errors/user.js";

export class UpdateTransactionService {
  constructor(updateTransactionRepository, getTransactionByIdRepository) {
    this.updateTransactionRepository = updateTransactionRepository;
    this.getTransactionByIdRepository = getTransactionByIdRepository;
  }
  async execute(transactionId, params) {
    const transaction = await this.getTransactionByIdRepository.execute(
      transactionId
    );

    if (transaction.user_id !== params.user_id) {
      throw new ForbidenError();
    }

    return await this.updateTransactionRepository.execute(
      transactionId,
      params
    );
  }
}
