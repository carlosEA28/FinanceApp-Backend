import "dotenv/config.js";
import { pool } from "../client.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execMigration = async () => {
  const client = await pool.connect();

  try {
    const filePath = path.join(__dirname, "01-init.sql");
    const script = fs.readFileSync(filePath, "utf-8");

    await client.query(script);

    console.log("Migrations Executed");
  } catch (error) {
    console.log(error);
  } finally {
    await client.release();
  }
};

execMigration();
