import { UserNotFoundError } from "../../errors/user.js";

export class GetUserBalanceService {
  constructor(getUserBalanceRepository, getUserByIdRepository) {
    this.getUserBalanceRepository = getUserBalanceRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }
  async execute(params, from, to) {
    const user = await this.getUserByIdRepository.execute(params.userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const balance = await this.getUserBalanceRepository.execute(
      params.userId,
      from,
      to
    );

    return balance;
  }
}
