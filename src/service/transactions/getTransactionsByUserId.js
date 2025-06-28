import { UserNotFoundError } from "../../errors/user.js";

export class GetTransactiosByUserId {
  constructor(getTransactiosByUserIdRepository, getUserByIdRepository) {
    this.getUserByIdRepository = getUserByIdRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }
  async execute(params) {
    const user = await this.getUserByIdRepository.execute(params.userId);

    if (!user) {
      return UserNotFoundError();
    }

    const transactions = await this.getTransactiosByUserIdRepository.execute(
      params.userId
    );

    return transactions;
  }
}
