import { v4 as uuidV4 } from "uuid";
import bcrypt from "bcrypt";
import { PostgtresCreteUserRepository } from "../repositories/postgres/create-user.js";
export class CreateUserService {
  async execute(createUserParams) {
    //TODO: verificar se o email ja esta em uso

    //gera o ID do user
    const userId = uuidV4();

    //criptografar a senha
    const hashedPassword = bcrypt.hash(createUserParams.password, 10);

    //inserir user no banco
    const newUser = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    };

    //chamar o repo

    const postgresRepo = new PostgtresCreteUserRepository();

    return await postgresRepo.execute(newUser);
  }
}
