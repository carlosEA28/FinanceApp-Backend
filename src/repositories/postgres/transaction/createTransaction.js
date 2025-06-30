import { prisma } from "../../../../prisma/prisma.js";

export class PostgresCreateTransactioRepository {
  async execute(createTransactionParams) {
    return await prisma.transaction.create({
      data: createTransactionParams,
    });
  }
}
