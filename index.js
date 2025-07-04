import "dotenv/config.js";
import express from "express";

import { usersRouter } from "./src/routes/users.js";

const app = express();
app.use(express.json());

app.use("/api/users", usersRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`);
});
