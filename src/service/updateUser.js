import { PostgresGetUserByEmailRepository } from "../repositories/postgres/getUserByEmail";
import bcrypt from "bcrypt";
import { PostgresUpdateUserRepository } from "../repositories/postgres/updateUser";

export class UpdateUserService {
  async execute(userId, updateUserParams) {
    // 1. se o email for atualizado, verficar se ele ja esta em uso
    if (updateUserParams.email) {
      const postgresGetUserByEmail = new PostgresGetUserByEmailRepository();

      const userAlreadyExists = postgresGetUserByEmail.execute(
        updateUserParams.email
      );

      if (userAlreadyExists) {
        throw new Error("The provided email is already in use");
      }

      const user = {
        ...updateUserParams,
      };

      // 2. se o password for atualizado, criptografa-lo
      if (updateUserParams.password) {
        const hashedPassword = await bcrypt.hash(updateUserParams.password, 10);
        user.password = hashedPassword;
      }

      // 3. chamar o repository para atualizar o user
      const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
      const updatedUser = await postgresUpdateUserRepository.execute(
        userId,
        user
      );

      return updatedUser;
    }
  }
}
