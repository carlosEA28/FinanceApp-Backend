import "dotenv/config.js";
import express from "express";
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeGetUserByIdController,
  makeUpdateUserController,
} from "./src/factories/controllers/user.js";
import {
  makeCreateTransactionController,
  makeDeleteTransaction,
  makeGetTransactionsByUserIdController,
  makeUpdateTransactionController,
} from "./src/factories/controllers/transaction.js";

const app = express();
app.use(express.json());

app.get("/api/users/:userId", async (req, res) => {
  const getUserByIdController = makeGetUserByIdController();

  const { statusCode, body } = await getUserByIdController.execute(req);

  res.status(statusCode).send(body);
});

app.post("/api/users", async (req, res) => {
  const createUserController = makeCreateUserController();

  const { statusCode, body } = await createUserController.execute(req);

  res.status(statusCode).send(body);
});

app.patch("/api/users/:userId", async (request, response) => {
  const updateUserController = makeUpdateUserController();

  const { statusCode, body } = await updateUserController.execute(request);

  response.status(statusCode).send(body);
});

app.delete("/api/users/:userId", async (req, res) => {
  const deleteUser = makeDeleteUserController();

  const { statusCode, body } = await deleteUser.execute(req);

  res.status(statusCode).send(body);
});

app.get("/api/transactions", async (req, res) => {
  const getTransactionsByUserIdController =
    makeGetTransactionsByUserIdController();

  const { statusCode, body } = await getTransactionsByUserIdController.execute(
    req
  );

  res.status(statusCode).send(body);
});

app.post("/api/transactions", async (req, res) => {
  const createTransactionController = makeCreateTransactionController();

  const { statusCode, body } = await createTransactionController.execute(req);

  res.status(statusCode).send(body);
});

app.patch("/api/transactions/:transactionId", async (req, res) => {
  const updateTransactionController = makeUpdateTransactionController();

  const { statusCode, body } = await updateTransactionController.execute(req);

  res.status(statusCode).send(body);
});

app.delete("/api/transactions/:transactionId", async (req, res) => {
  const deleteTransactionController = makeDeleteTransaction();

  const { statusCode, body } = await deleteTransactionController.execute(req);

  res.status(statusCode).send(body);
});

app.listen(process.env.PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`);
});
