import { PostgresDeleteUserRepository } from "../repositories/postgres/deleteUser.js";

export class DeleteUserService {
  constructor(deleteUserRepository) {
    this.deleteUserRepository = deleteUserRepository;
  }
  async execute(userId) {
    const user = await this.deleteUserRepository.execute(userId);

    return user;
  }
}
