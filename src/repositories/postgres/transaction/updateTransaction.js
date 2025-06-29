import { PostgresClient } from "../../../db/postgres/client.js";

export class PostgresUpdateTransactionRepository {
  async execute(userId, updateTransactionParams) {
    const updatedFields = [];
    const updatedValues = [];

    Object.keys(updateUserParams).forEach((key, index) => {
      updatedFields.push(`${key} = $${index + 1}`);
      updatedValues.push(updateTransactionParams[key]);
    });

    updatedValues.push(userId);
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
