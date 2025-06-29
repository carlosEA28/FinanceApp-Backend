import { PostgresCreateTransactioRepository } from "../../repositories/postgres/transaction/createTransaction.js";
import { CreateTransactionService } from "../../service/transactions/createTrasaction.js";
import { PostgresGetUserById } from "../../repositories/postgres/user/get-user-by-id.js";
import { CreateTransactionController } from "../../controllers/transaction/createTransaction.js";
import { GetTransactiosByUserIdController } from "../../controllers/transaction/getTransactiosnByUserId.js";
import { PostgresGetTransatctionsByUserIdRepository } from "../../repositories/postgres/transaction/getTransactionsByUserId.js";
import { GetTransactiosByUserIdService } from "../../service/transactions/getTransactionsByUserId.js";

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

export const makeGetTransactionsByUserIdController = () => {
  const getTransactiosByUserIdRepository =
    new PostgresGetTransatctionsByUserIdRepository();

  const getUserByIdRepository = new PostgresGetUserById();

  const getTransactionsByUserIdService = new GetTransactiosByUserIdService(
    getTransactiosByUserIdRepository,
    getUserByIdRepository
  );

  const getTransactionsByUserIdController =
    new GetTransactiosByUserIdController(getTransactionsByUserIdService);

  return getTransactionsByUserIdController;
};
