import { PostgresClient } from "../../db/postgres/client.js";

export class PostgtresCreteUserRepository {
  async execute(createUserParams) {
    await PostgresClient.query(
      "INSERT INTO users(id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)",
      [
        createUserParams.id,
        createUserParams.first_name,
        createUserParams.last_name,
        createUserParams.email,
        createUserParams.password,
      ]
    );

    const createdUser = await PostgresClient.query(
      "SELECT * FROM users WHERE id = $1",
      [createUserParams.id]
    );

    return createdUser[0];
  }
}
