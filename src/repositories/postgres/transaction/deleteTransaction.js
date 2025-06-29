import { PostgresClient } from "../../../db/postgres/client.js";

export class PostgresDeleteTransactionRepository {
  async execute(transactionId) {
    const transaction = await PostgresClient.query(
      "DELETE FROM transactions WHERE id = $1 RETURNING *",
      [transactionId]
    );

    return transaction[0];
  }
}
