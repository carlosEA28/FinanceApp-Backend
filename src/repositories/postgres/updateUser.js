import { PostgresClient } from "../../db/postgres/client.js";

export class PostgresUpdateUserRepository {
  async execute(userId, updateUserParams) {
    const updatedFields = [];
    const updatedValues = [];

    Object.keys(updateUserParams).forEach((key) => {
      updatedFields.push(`${key} = ${updatedValues.length + 1}`);
      updatedValues.pushI(updateUserParams[key]);
    });

    updatedValues.push(userId);

    const updateQuery = `UPDATE users SET ${updatedFields.join(
      ", "
    )} WHERE id = ${updatedValues.length} RETURNING *`;

    const updatedUser = await PostgresClient.query(updateQuery, updatedValues);

    return updatedUser[0];
  }
}
