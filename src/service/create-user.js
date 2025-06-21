import { v4 as uuidV4 } from "uuid";
import bcrypt from "bcrypt";
import { generateEmailAlreadyInUse } from "../controllers/helpers/userHelpers.js";
export class CreateUserService {
  constructor(getUserByEmailRepository, createUserRepository) {
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.createUserRepository = createUserRepository;
  }
  async execute(createUserParams) {
    const userAlreadyExists = await this.getUserByEmailRepository.execute(
      createUserParams.email
    );

    if (userAlreadyExists) {
      return generateEmailAlreadyInUse();
    }

    const userId = uuidV4();

    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

    const newUser = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    };

    const createdUser = await this.createUserRepository.execute(newUser);

    return createdUser;
  }
}
