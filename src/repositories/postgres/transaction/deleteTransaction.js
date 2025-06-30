import { PostgresClient } from "../../../db/postgres/client.js";
import { prisma } from "../../../../prisma/prisma.js";

export class PostgresDeleteTransactionRepository {
  async execute(transactionId) {
    return await prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });
  }
}
