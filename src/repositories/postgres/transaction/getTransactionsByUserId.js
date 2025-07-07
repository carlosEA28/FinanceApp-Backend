import { prisma } from "../../../../prisma/prisma.js";

export class PostgresGetTransatctionsByUserIdRepository {
  async execute(userId, from, to) {
    return await prisma.transaction.findMany({
      where: {
        user_id: userId,
        date: {
          gte: new Date(from), //maior igual
          lte: new Date(to), // menor igual
        },
      },
    });
  }
}
