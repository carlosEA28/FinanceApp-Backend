import { PostgresClient } from "../../db/postgres/client.js";

export class PostgresGetUserByEmailRepository {
  async execute(userId) {
    const user = await PostgresClient.query(
      "SELECT * FROM users WHERE email = $1",
      [userId]
    );

    return user[0];
  }
}
