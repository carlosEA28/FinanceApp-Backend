import { UserNotFoundError } from "../../errors/user.js";

export class GetTransactiosByUserIdService {
  constructor(getTransactiosByUserIdRepository, getUserByIdRepository) {
    this.getTransactiosByUserIdRepository = getTransactiosByUserIdRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }
  async execute(userId, from, to) {
    const user = await this.getUserByIdRepository.execute(userId);

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    const transactions = await this.getTransactiosByUserIdRepository.execute(
      userId,
      from,
      to
    );

    return transactions;
  }
}
