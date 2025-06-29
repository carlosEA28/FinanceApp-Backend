import { UserNotFoundError } from "../../errors/user.js";

export class GetUserBalanceService {
  constructor(getUserBalanceRepository, getUserByIdRepository) {
    this.getUserBalanceRepository = getUserBalanceRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }
  async execute(params) {
    const user = await this.getUserByIdRepository.execute(params.userId);

    console.log("Usuário encontrado:", user);

    if (!user) {
      throw new UserNotFoundError();
    }

    const balance = await this.getUserBalanceRepository.execute(params.userId);

    return balance;
  }
}
