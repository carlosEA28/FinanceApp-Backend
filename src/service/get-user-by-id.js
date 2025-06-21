import { PostgresGetUserById } from "../repositories/postgres/get-user-by-id.js";

export class GetUserByIdService {
  async execute(userId) {
    const getUserById = new PostgresGetUserById();
    const user = await getUserById.execute(userId);

    return user;
  }
}
