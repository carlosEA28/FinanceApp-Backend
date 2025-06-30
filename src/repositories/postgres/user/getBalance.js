import { prisma } from "../../../../prisma/prisma.js";
import { Prisma } from "../../../generated/prisma/index.js";

export class PostgresGetBalanceRepository {
  async execute(userId) {
    const totalExpenses = await prisma.transaction.aggregate({
      where: {
        user_id: userId,
        type: "EXPENSE",
      },
      _sum: {
        amount: true,
      },
    });

    const totalEarnings = await prisma.transaction.aggregate({
      where: {
        user_id: userId,
        type: "EARNING",
      },
      _sum: {
        amount: true,
      },
    });

    const totalInvestments = await prisma.transaction.aggregate({
      where: {
        user_id: userId,
        type: "INVESTMENT",
      },
      _sum: {
        amount: true,
      },
    });

    const _totalEarnings = totalEarnings._sum.amount ?? new Prisma.Decimal(0);
    const _totalExpenses = totalExpenses._sum.amount ?? new Prisma.Decimal(0);
    const _totalInvestments =
      totalInvestments._sum.amount ?? new Prisma.Decimal(0);

    const balance = _totalEarnings
      .minus(_totalExpenses)
      .minus(_totalInvestments);

    return {
      earnings: _totalEarnings,
      expenses: _totalExpenses,
      investments: _totalInvestments,
      balance,
    };
  }
}
