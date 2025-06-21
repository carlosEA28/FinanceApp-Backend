import "dotenv/config.js";
import express from "express";
import { CreateUserController } from "./src/controllers/create-user.js";
import { GetUserByIdController } from "./src/controllers/get-user-by-id.js";
import { UpdateUserController } from "./src/controllers/updateUser.js";
import { DeleteUserService } from "./src/service/deleteUser.js";
import { DeleteUserController } from "./src/controllers/deleteUser.js";
import { GetUserByIdService } from "./src/service/get-user-by-id.js";
import { PostgresGetUserById } from "./src/repositories/postgres/get-user-by-id.js";

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
  const createUserController = new CreateUserController();
  const { statusCode, body } = await createUserController.execute(req);

  res.status(statusCode).send(body);
});

app.patch("/api/users/:userId", async (request, response) => {
  const updateUserController = new UpdateUserController();

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
