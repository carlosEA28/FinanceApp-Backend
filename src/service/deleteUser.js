import { PostgresDeleteUserRepository } from "../repositories/postgres/deleteUser.js";

export class DeleteUserService {
  async execute(userId) {
    const deleteUser = new PostgresDeleteUserRepository();
    const user = await deleteUser.execute(userId);

    return user;
  }
}
