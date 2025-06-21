import "dotenv/config.js";
import express from "express";
import { CreateUserController } from "./src/controllers/create-user.js";
import { GetUserByIdController } from "./src/controllers/get-user-by-id.js";
import { UpdateUserController } from "./src/controllers/updateUser.js";
import { DeleteUserController } from "./src/controllers/deleteUser.js";
import { GetUserByIdService } from "./src/service/get-user-by-id.js";
import { PostgresGetUserById } from "./src/repositories/postgres/get-user-by-id.js";
import { PostgtresCreteUserRepository } from "./src/repositories/postgres/create-user.js";
import { CreateUserService } from "./src/service/create-user.js";
import { PostgresGetUserByEmailRepository } from "./src/repositories/postgres/getUserByEmail.js";
import { PostgresUpdateUserRepository } from "./src/repositories/postgres/updateUser.js";
import { UpdateUserService } from "./src/service/updateUser.js";

const app = express();
app.use(express.json());

app.get("/api/users/:userId", async (req, res) => {
  const getUserByIdRepository = new PostgresGetUserById();

  const getUserByIdService = new GetUserByIdService(getUserByIdRepository);

  const getUserByIdController = new GetUserByIdController(getUserByIdService);

  const { statusCode, body } = await getUserByIdController.execute(req);

  res.status(statusCode).send(body);
});

app.post("/api/users", async (req, res) => {
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

  const createUserRepository = new PostgtresCreteUserRepository();

  const createUserService = new CreateUserService(
    getUserByEmailRepository,
    createUserRepository
  );

  const createUserController = new CreateUserController(createUserService);

  const { statusCode, body } = await createUserController.execute(req);

  res.status(statusCode).send(body);
});

app.patch("/api/users/:userId", async (request, response) => {
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

  const updateUserRepository = new PostgresUpdateUserRepository();

  const updateUserService = new UpdateUserService(
    getUserByEmailRepository,
    updateUserRepository
  );

  const updateUserController = new UpdateUserController(updateUserService);

  const { statusCode, body } = await updateUserController.execute(request);

  response.status(statusCode).send(body);
});

app.delete("/api/users/:userId", async (req, res) => {
  const deleteUser = new DeleteUserController();

  const { statusCode, body } = await deleteUser.execute(req);

  res.status(statusCode).send(body);
});

app.listen(process.env.PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`);
});
