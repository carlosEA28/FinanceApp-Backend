import { prisma } from "../../../../prisma/prisma.js";

export class PostgresGetUserById {
  async execute(userId) {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
