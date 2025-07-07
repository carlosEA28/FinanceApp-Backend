import { Router } from "express";
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeGetUserBalanceController,
  makeGetUserByIdController,
  makeLoginUserController,
  makeUpdateUserController,
} from "../factories/controllers/user.js";
import { auth } from "../middlewares/auth.js";

export const usersRouter = Router();

usersRouter.get("/:userId", auth, async (req, res) => {
  const getUserByIdController = makeGetUserByIdController();

  const { statusCode, body } = await getUserByIdController.execute(req);

  res.status(statusCode).send(body);
});

usersRouter.post("/", async (req, res) => {
  const createUserController = makeCreateUserController();

  const { statusCode, body } = await createUserController.execute(req);

  res.status(statusCode).send(body);
});

usersRouter.patch("/:userId", auth, async (request, response) => {
  const updateUserController = makeUpdateUserController();

  const { statusCode, body } = await updateUserController.execute(request);

  response.status(statusCode).send(body);
});

usersRouter.delete("/:userId", auth, async (req, res) => {
  const deleteUser = makeDeleteUserController();

  const { statusCode, body } = await deleteUser.execute(req);

  res.status(statusCode).send(body);
});

usersRouter.get("/:userId/balance", auth, async (req, res) => {
  const getUserBalanceController = makeGetUserBalanceController();

  const { statusCode, body } = await getUserBalanceController.execute(req);

  res.status(statusCode).send(body);
});

usersRouter.post("/login", async (req, res) => {
  const loginUserController = makeLoginUserController();

  const { statusCode, body } = await loginUserController.execute(req);

  res.status(statusCode).send(body);
});
