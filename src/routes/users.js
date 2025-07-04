import { Router } from "express";
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeGetUserBalanceController,
  makeGetUserByIdController,
  makeUpdateUserController,
} from "../factories/controllers/user.js";

export const usersRouter = Router();

usersRouter.get("/:userId", async (req, res) => {
  const getUserByIdController = makeGetUserByIdController();

  const { statusCode, body } = await getUserByIdController.execute(req);

  res.status(statusCode).send(body);
});

usersRouter.post("/", async (req, res) => {
  const createUserController = makeCreateUserController();

  const { statusCode, body } = await createUserController.execute(req);

  res.status(statusCode).send(body);
});

usersRouter.patch("/:userId", async (request, response) => {
  const updateUserController = makeUpdateUserController();

  const { statusCode, body } = await updateUserController.execute(request);

  response.status(statusCode).send(body);
});

usersRouter.delete("/:userId", async (req, res) => {
  const deleteUser = makeDeleteUserController();

  const { statusCode, body } = await deleteUser.execute(req);

  res.status(statusCode).send(body);
});

usersRouter.get("/:userId/balance", async (req, res) => {
  const getUserBalanceController = makeGetUserBalanceController();

  const { statusCode, body } = await getUserBalanceController.execute(req);

  res.status(statusCode).send(body);
});
