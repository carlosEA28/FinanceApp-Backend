import { PostgresClient } from "../../../db/postgres/client.js";

export class PostgresGetTransatctionsByUserIdRepository {
  async execute(userId) {
    const transactios = await PostgresClient.query(
      "SELECT * FROM transactions WHERE user_id = $1",
      [userId]
    );

    return transactios;
  }
}
