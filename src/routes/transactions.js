import { Router } from "express";
import {
  makeCreateTransactionController,
  makeDeleteTransaction,
  makeGetTransactionsByUserIdController,
  makeUpdateTransactionController,
} from "../factories/controllers/transaction.js";
import { auth } from "../middlewares/auth.js";

export const transactionsRouter = Router();

transactionsRouter.get("/", auth, async (req, res) => {
  const getTransactionsByUserIdController =
    makeGetTransactionsByUserIdController();

  const { statusCode, body } = await getTransactionsByUserIdController.execute({
    ...req,
    query: {
      ...req.query,
      from: req.query.from,
      to: req.query.to,
      userId: req.userId,
    },
  });

  res.status(statusCode).send(body);
});

transactionsRouter.post("/", auth, async (req, res) => {
  const createTransactionController = makeCreateTransactionController();

  const { statusCode, body } = await createTransactionController.execute({
    ...req,
    body: {
      ...req.body,
      user_id: req.userId,
    },
  });

  res.status(statusCode).send(body);
});

transactionsRouter.patch("/:transactionId", auth, async (req, res) => {
  const updateTransactionController = makeUpdateTransactionController();

  const { statusCode, body } = await updateTransactionController.execute({
    ...req,
    body: {
      ...req.body,
      user_id: req.user_id,
    },
  });

  res.status(statusCode).send(body);
});

transactionsRouter.delete("/:transactionId", async (req, res) => {
  const deleteTransactionController = makeDeleteTransaction();

  const { statusCode, body } = await deleteTransactionController.execute(req);

  res.status(statusCode).send(body);
});
