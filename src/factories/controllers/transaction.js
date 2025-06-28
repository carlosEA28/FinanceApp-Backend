import { PostgresCreateTransactioRepository } from "../../repositories/postgres/transaction/createTransaction.js";
import { CreateTransactionService } from "../../service/transactions/createTrasaction.js";
import { PostgresGetUserById } from "../../repositories/postgres/user/get-user-by-id";
import { CreateTransactionController } from "../../controllers/transaction/createTransaction";

export const makeCreateTransactionController = () => {
  const prostgresCreateTransactionRepository =
    new PostgresCreateTransactioRepository();

  const getUserByIdRepository = new PostgresGetUserById();

  const createTransactionService = new CreateTransactionService(
    prostgresCreateTransactionRepository,
    getUserByIdRepository
  );

  const createTransactionController = new CreateTransactionController(
    createTransactionService
  );

  return createTransactionController;
};
