import { PostgresCreateTransactioRepository } from "../../repositories/postgres/transaction/createTransaction.js";
import { CreateTransactionService } from "../../service/transactions/createTrasaction.js";
import { PostgresGetUserById } from "../../repositories/postgres/user/get-user-by-id.js";
import { CreateTransactionController } from "../../controllers/transaction/createTransaction.js";
import { GetTransactiosByUserIdController } from "../../controllers/transaction/getTransactiosnByUserId.js";
import { PostgresGetTransatctionsByUserIdRepository } from "../../repositories/postgres/transaction/getTransactionsByUserId.js";
import { GetTransactiosByUserIdService } from "../../service/transactions/getTransactionsByUserId.js";
import { PostgresUpdateTransactionRepository } from "../../repositories/postgres/transaction/updateTransaction.js";
import { UpdateTransactionService } from "../../service/transactions/updateTransaction.js";
import { UpdateTransactionController } from "../../controllers/transaction/updateTransaction.js";
import { PostgresDeleteTransactionRepository } from "../../repositories/postgres/transaction/deleteTransaction.js";
import { DeleteTransactionService } from "../../service/transactions/deleteTransaction.js";
import { DeleteTransactionController } from "../../controllers/transaction/deleteTransaction.js";
import { GetTransactionByIdRepository } from "../../repositories/postgres/transaction/getTransactionById.js";

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

export const makeUpdateTransactionController = () => {
  const updateTransactionRepository = new PostgresUpdateTransactionRepository();
  const getTransactionByIdRepository = new GetTransactionByIdRepository();

  const updateTransactionService = new UpdateTransactionService(
    updateTransactionRepository,
    getTransactionByIdRepository
  );

  const updateTransactionController = new UpdateTransactionController(
    updateTransactionService
  );

  return updateTransactionController;
};

export const makeDeleteTransaction = () => {
  const deleteTransactionRepository = new PostgresDeleteTransactionRepository();

  const deleteTransactionService = new DeleteTransactionService(
    deleteTransactionRepository
  );

  const deleteTransactionController = new DeleteTransactionController(
    deleteTransactionService
  );

  return deleteTransactionController;
};
