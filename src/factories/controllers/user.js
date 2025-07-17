import { CreateUserController } from "../../controllers/create-user.js";
import { DeleteUserController } from "../../controllers/deleteUser.js";
import { GetUserByIdController } from "../../controllers/get-user-by-id.js";
import { UpdateUserController } from "../../controllers/updateUser.js";
import { PostgtresCreteUserRepository } from "../../repositories/postgres/user/create-user.js";
import { PostgresDeleteUserRepository } from "../../repositories/postgres/user/deleteUser.js";
import { PostgresGetUserById } from "../../repositories/postgres/user/get-user-by-id.js";
import { PostgresGetBalanceRepository } from "../../repositories/postgres/user/getBalance.js";
import { PostgresGetUserByEmailRepository } from "../../repositories/postgres/user/getUserByEmail.js";
import { PostgresUpdateUserRepository } from "../../repositories/postgres/user/updateUser.js";
import { CreateUserService } from "../../service/user/create-user.js";
import { DeleteUserService } from "../../service/user/deleteUser.js";
import { GetUserByIdService } from "../../service/user/get-user-by-id.js";
import { UpdateUserService } from "../../service/user/updateUser.js";
import { GetUserBalanceService } from "../../service/user/getUserBalance.js";
import { GetUserBalanceController } from "../../controllers/getUserBalance.js";
import { LoginUserController } from "../../controllers/loginUser.js";
import { PasswordComparatorAdapter } from "../../adapters/password-comparator.js";
import { TokenGeneratorAdapter } from "../../adapters/tokenGenerator.js";
import { LoginUserService } from "../../service/user/loginUser.js";
import { RefreshTokenController } from "../../controllers/refreshToken.js";
import { RefreshTokenService } from "../../service/user/refreshToken.js";
import { TokenVerifier } from "../../adapters/tokenVerifier.js";

export const makeGetUserByIdController = () => {
  const getUserByIdRepository = new PostgresGetUserById();

  const getUserByIdService = new GetUserByIdService(getUserByIdRepository);

  const getUserByIdController = new GetUserByIdController(getUserByIdService);

  return getUserByIdController;
};

export const makeCreateUserController = () => {
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

  const createUserRepository = new PostgtresCreteUserRepository();

  const tokensGeneratorAdapter = new TokenGeneratorAdapter();

  const createUserService = new CreateUserService(
    getUserByEmailRepository,
    createUserRepository,
    tokensGeneratorAdapter
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

export const makeGetUserBalanceController = () => {
  const getUserBalanceRepository = new PostgresGetBalanceRepository();
  const getUserByIdRepository = new PostgresGetUserById();

  const getUserBalanceService = new GetUserBalanceService(
    getUserBalanceRepository,
    getUserByIdRepository
  );

  const getUserBalanceController = new GetUserBalanceController(
    getUserBalanceService
  );

  return getUserBalanceController;
};

export const makeLoginUserController = () => {
  const passwordComparatorAdapter = new PasswordComparatorAdapter();
  const tokenGeneratorAdapter = new TokenGeneratorAdapter();
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

  const loginUserService = new LoginUserService(
    getUserByEmailRepository,
    passwordComparatorAdapter,
    tokenGeneratorAdapter
  );

  const loginUserController = new LoginUserController(loginUserService);
  return loginUserController;
};

export const makeRefreshTokenController = () => {
  const tokenGeneratorAdapter = new TokenGeneratorAdapter();
  const tokenVerifierAdapter = new TokenVerifier();

  const refreshTokenService = new RefreshTokenService(
    tokenGeneratorAdapter,
    tokenVerifierAdapter
  );

  const refreshTokenController = new RefreshTokenController(
    refreshTokenService
  );

  return refreshTokenController;
};
