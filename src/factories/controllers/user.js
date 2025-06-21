import { CreateUserController } from "../../controllers/create-user.js";
import { DeleteUserController } from "../../controllers/deleteUser.js";
import { GetUserByIdController } from "../../controllers/get-user-by-id.js";
import { UpdateUserController } from "../../controllers/updateUser.js";
import { PostgtresCreteUserRepository } from "../../repositories/postgres/create-user.js";
import { PostgresDeleteUserRepository } from "../../repositories/postgres/deleteUser.js";
import { PostgresGetUserById } from "../../repositories/postgres/get-user-by-id.js";
import { PostgresGetUserByEmailRepository } from "../../repositories/postgres/getUserByEmail.js";
import { PostgresUpdateUserRepository } from "../../repositories/postgres/updateUser.js";
import { CreateUserService } from "../../service/create-user.js";
import { DeleteUserService } from "../../service/deleteUser.js";
import { GetUserByIdService } from "../../service/get-user-by-id.js";
import { UpdateUserService } from "../../service/updateUser.js";

export const makeGetUserByIdController = () => {
  const getUserByIdRepository = new PostgresGetUserById();

  const getUserByIdService = new GetUserByIdService(getUserByIdRepository);

  const getUserByIdController = new GetUserByIdController(getUserByIdService);

  return getUserByIdController;
};

export const makeCreateUserController = () => {
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

  const createUserRepository = new PostgtresCreteUserRepository();

  const createUserService = new CreateUserService(
    getUserByEmailRepository,
    createUserRepository
  );

  const createUserController = new CreateUserController(createUserService);

  return createUserController;
};

export const makeUpdateUserController = () => {
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

  const updateUserRepository = new PostgresUpdateUserRepository();

  const updateUserService = new UpdateUserService(
    getUserByEmailRepository,
    updateUserRepository
  );

  const updateUserController = new UpdateUserController(updateUserService);

  return updateUserController;
};

export const makeDeleteUserController = () => {
  const deleteUserRepository = new PostgresDeleteUserRepository();

  const deleteUserService = new DeleteUserService(deleteUserRepository);

  const deleteUser = new DeleteUserController(deleteUserService);

  return deleteUser;
};
