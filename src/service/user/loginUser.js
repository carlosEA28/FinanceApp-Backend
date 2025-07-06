import dotenv from "dotenv";
import { InvalidPasswordError, UserNotFoundError } from "../../errors/user.js";

dotenv.config();

export class LoginUserService {
  constructor(
    getUserByEmailRepository,
    passwordComparatorAdapter,
    tokenGeneratorAdapter
  ) {
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.passwordComparatorAdapter = passwordComparatorAdapter;
    this.tokenGeneratorAdapter = tokenGeneratorAdapter;
  }
  async execute(email, password) {
    //verificar se o email e valido
    const user = await this.getUserByEmailRepository.execute(email);
    if (!user) {
      throw new UserNotFoundError();
    }

    //verificar se  a senha recebida e valida

    const isPasswordValid = this.passwordComparatorAdapter.execute(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new InvalidPasswordError();
    }
    //gerar os tokens

    return {
      ...user,
      tokens: await this.tokenGeneratorAdapter.execute(user.id),
    };
  }
}
