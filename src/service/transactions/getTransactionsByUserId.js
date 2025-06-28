import { UserNotFoundError } from "../../errors/user.js";

export class GetTransactiosByUserIdService {
  constructor(getTransactiosByUserIdRepository, getUserByIdRepository) {
    this.getUserByIdRepository = getUserByIdRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }
  async execute(params) {
    const user = await this.getUserByIdRepository.execute(params.userId);

    if (!user) {
      throw new UserNotFoundError(params.userId);
    }

    const transactions = await this.getTransactiosByUserIdRepository.execute(
      params.userId
    );

    return transactions;
  }
}
