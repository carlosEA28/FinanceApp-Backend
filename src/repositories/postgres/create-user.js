import { PostgresClient } from "../../db/postgres/client";

export class PostgtresCreteUserRepository {
  async execute(createUserParams) {
    const result = await PostgresClient.query(
      "INSERT INTO users(ID, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)",
      [
        createUserParams.ID,
        createUserParams.first_name,
        createUserParams.last_name,
        createUserParams.email,
        createUserParams.password,
      ]
    );

    return result[0];
  }
}
