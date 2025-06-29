import { PostgresClient } from "../../../db/postgres/client.js";

export class PostgresGetUserById {
  async execute(userId) {
    const user = await PostgresClient.query(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );

    console.log("Resultado da query:", user[0]); // 👈 loga aqui!

    return user[0];
  }
}
