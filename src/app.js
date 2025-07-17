import express from "express";

import { usersRouter } from "./routes/users.js";
import { transactionsRouter } from "./routes/transactions.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import cors from "cors";

export const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/transactions", transactionsRouter);

const swaggerDocument = JSON.parse(
  fs.readFileSync(
    path.join(import.meta.dirname, "../docs/swagger.json"),
    "utf8"
  )
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
