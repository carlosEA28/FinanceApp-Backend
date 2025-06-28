import { UserNotFoundError } from "../../errors/user";
import { v4 as uuidv4 } from "uuid";

export class CreateTransactionService {
  constructor(createTransactionRepository, getUserByIdRepository) {
    this.createTransactionRepository = createTransactionRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(createTransactionParams) {
    const userId = await createTransactionParams.userId;

    const user = this.getUserByIdRepository.execute(userId);

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    const transactionId = uuidv4();

    const transaction = await this.createTransactionRepository.execute({
      ...createTransactionParams,
      id: transactionId,
    });

    return transaction;
  }
}
