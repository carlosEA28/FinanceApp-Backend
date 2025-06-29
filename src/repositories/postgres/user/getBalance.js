import { PostgresClient } from "../../../db/postgres/client.js";

export class PostgresGetBalanceRepository {
  async execute(userId) {
    const results = await PostgresClient.query(
      `
      SELECT
        SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) AS earnings,
        SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) AS expenses,
        SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END) AS investments,
        (
          SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) -
          SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) -
          SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END)
        ) AS balance
      FROM transactions
      WHERE user_id = $1
      `,
      [userId]
    );

    return results[0];
  }
}
