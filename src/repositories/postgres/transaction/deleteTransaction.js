import { prisma } from "../../../../prisma/prisma.js";
import { TransactionNotFoundError } from "../../../errors/transaction.js";
import { Prisma } from "../../../generated/prisma/index.js";

export class PostgresDeleteTransactionRepository {
  async execute(transactionId) {
    try {
      return await prisma.transaction.delete({
        where: {
          id: transactionId,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new TransactionNotFoundError(transactionId);
      }
      console.error(error);
      throw error;
    }
  }
}
