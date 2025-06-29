import { UserNotFoundError } from "../../errors/user.js";

export class UpdateTransactionService {
  constructor(updateTransactionRepository, getUserByIdRepository) {
    this.updateTransactionRepository = updateTransactionRepository;
  }
  async execute(transactionId, params) {
    const transaction = await this.updateTransactionRepository.execute(
      transactionId,
      params
    );

    return transaction;
  }
}
