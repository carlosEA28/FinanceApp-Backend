import { PostgresClient } from "../../../db/postgres/client.js";

export class PostgresUpdateTransactionRepository {
  async execute(transactionId, updateTransactionParams) {
    const updatedFields = [];
    const updatedValues = [];

    Object.keys(updateTransactionParams).forEach((key, index) => {
      updatedFields.push(`${key} = $${index + 1}`);
      updatedValues.push(updateTransactionParams[key]);
    });

    updatedValues.push(transactionId);
    const userIdPlaceholder = `$${updatedValues.length}`;

    const updateQuery = `
         UPDATE transactions
         SET ${updatedFields.join(", ")}
         WHERE id = ${userIdPlaceholder}
         RETURNING *
       `;

    const result = await PostgresClient.query(updateQuery, updatedValues);

    return result[0];
  }
}
