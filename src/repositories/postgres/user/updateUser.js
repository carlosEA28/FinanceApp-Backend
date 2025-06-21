import { PostgresClient } from "../../../db/postgres/client.js";
export class PostgresUpdateUserRepository {
  async execute(userId, updateUserParams) {
    const updatedFields = [];
    const updatedValues = [];

    Object.keys(updateUserParams).forEach((key, index) => {
      updatedFields.push(`${key} = $${index + 1}`);
      updatedValues.push(updateUserParams[key]);
    });

    // Adicione o userId como último valor
    updatedValues.push(userId);
    const userIdPlaceholder = `$${updatedValues.length}`;

    const updateQuery = `
      UPDATE users
      SET ${updatedFields.join(", ")}
      WHERE id = ${userIdPlaceholder}
      RETURNING *
    `;

    const result = await PostgresClient.query(updateQuery, updatedValues);

    return result[0]; // .rows pois pg retorna { rows: [...] }
  }
}
