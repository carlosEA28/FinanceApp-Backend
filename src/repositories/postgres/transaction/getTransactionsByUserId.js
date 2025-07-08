import { prisma } from "../../../../prisma/prisma.js";

export class PostgresGetTransatctionsByUserIdRepository {
  async execute(userId, from, to) {
    return await prisma.transaction.findMany({
      where: {
        user_id: userId,
        date: {
          gte: from, //maior igual
          lte: to, // menor igual
        },
      },
    });
  }
}
