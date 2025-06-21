import { v4 as uuidV4 } from "uuid";
import bcrypt from "bcrypt";
import { PostgtresCreteUserRepository } from "../repositories/postgres/create-user.js";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/getUserByEmail.js";
export class CreateUserService {
  async execute(createUserParams) {
    const postgresGetUserByEmail = new PostgresGetUserByEmailRepository();

    const userAlreadyExists = postgresGetUserByEmail.execute(
      createUserParams.email
    );

    if (userAlreadyExists) {
      throw new Error("The provided email is already in use");
    }

    //gera o ID do user
    const userId = uuidV4();

    //criptografar a senha
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

    //inserir user no banco
    const newUser = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    };

    //chamar o repo
    const postgresRepo = new PostgtresCreteUserRepository();

    const createdUser = await postgresRepo.execute(newUser);

    return createdUser;
  }
}
