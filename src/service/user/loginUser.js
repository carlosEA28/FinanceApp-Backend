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
    const user = await this.getUserByEmailRepository.execute(email);
    if (!user) {
      throw new UserNotFoundError();
    }

    const isPasswordValid = this.passwordComparatorAdapter.execute(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new InvalidPasswordError();
    }

    return {
      ...user,
      tokens: await this.tokenGeneratorAdapter.execute(user.id),
    };
  }
}
