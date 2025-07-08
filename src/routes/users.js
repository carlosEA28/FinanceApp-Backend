import { Router } from "express";
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeGetUserBalanceController,
  makeGetUserByIdController,
  makeLoginUserController,
  makeRefreshTokenController,
  makeUpdateUserController,
} from "../factories/controllers/user.js";
import { auth } from "../middlewares/auth.js";

export const usersRouter = Router();

usersRouter.get("/me", auth, async (req, res) => {
  const getUserByIdController = makeGetUserByIdController();

  const { statusCode, body } = await getUserByIdController.execute({
    ...req,
    params: {
      userId: req.userId,
    },
  });

  res.status(statusCode).send(body);
});

usersRouter.post("/", async (req, res) => {
  const createUserController = makeCreateUserController();

  const { statusCode, body } = await createUserController.execute(req);

  res.status(statusCode).send(body);
});

usersRouter.patch("/me", auth, async (request, response) => {
  const updateUserController = makeUpdateUserController();

  const { statusCode, body } = await updateUserController.execute({
    ...req,
    params: {
      userId: req.userId,
    },
  });

  response.status(statusCode).send(body);
});

usersRouter.delete("/me", auth, async (req, res) => {
  const deleteUser = makeDeleteUserController();

  const { statusCode, body } = await deleteUser.execute({
    ...req,
    params: {
      userId: req.userId,
    },
  });

  res.status(statusCode).send(body);
});

usersRouter.get("/me/balance", auth, async (req, res) => {
  const getUserBalanceController = makeGetUserBalanceController();

  const { statusCode, body } = await getUserBalanceController.execute({
    ...req,
    params: {
      userId: req.userId,
    },
    query: {
      from: req.query.from,
      to: req.query.to,
    },
  });

  res.status(statusCode).send(body);
});

usersRouter.post("/login", async (req, res) => {
  const loginUserController = makeLoginUserController();

  const { statusCode, body } = await loginUserController.execute(req);

  res.status(statusCode).send(body);
});

usersRouter.post("/refresh-token", async (req, res) => {
  const refreshTokenController = makeRefreshTokenController();

  const { statusCode, body } = await refreshTokenController.execute(req);

  res.status(statusCode).send(body);
});
