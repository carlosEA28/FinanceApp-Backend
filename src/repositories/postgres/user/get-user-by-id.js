import { PostgresClient } from "../../../db/postgres/client.js";

export class PostgresGetUserById {
  async execute(userId) {
    const user = await PostgresClient.query(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );

    return user[0];
  }
}
