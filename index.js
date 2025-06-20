import "dotenv/config.js";
import express from "express";
import { PostgresClient } from "./src/db/postgres/client.js";

const app = express();

app.get("/", async (req, res) => {
  const results = PostgresClient.query("SELECT * FROM users;");
  res.send(JSON.stringify(results.rows));
});

app.listen(3000, () => {
  console.log("oi");
});
