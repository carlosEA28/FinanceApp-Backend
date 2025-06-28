import { PostgresClient, PostgresHelper } from "../../../db/postgres/client.js";

export class PostgresGetTransatctionsByUserIdRepository {
  async execute() {
    const transactios = await PostgresClient.query(
      "SELECT * FROM transactions WHERE user_id = $1",
      [userId]
    );

    return transactios;
  }
}
