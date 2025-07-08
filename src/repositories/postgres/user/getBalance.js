import { prisma } from "../../../../prisma/prisma.js";
import { Prisma } from "../../../generated/prisma/index.js";

export class PostgresGetBalanceRepository {
  async execute(userId, from, to) {
    const dateFilter = {
      date: {
        gte: new Date(from),
        lte: new Date(to),
      },
    };
    const totalExpenses = await prisma.transaction.aggregate({
      where: {
        user_id: userId,
        type: "EXPENSE",
        ...dateFilter,
      },
      _sum: {
        amount: true,
      },
    });

    const totalEarnings = await prisma.transaction.aggregate({
      where: {
        user_id: userId,
        type: "EARNING",
        ...dateFilter,
      },
      _sum: {
        amount: true,
      },
    });

    const totalInvestments = await prisma.transaction.aggregate({
      where: {
        user_id: userId,
        type: "INVESTMENT",
        ...dateFilter,
      },
      _sum: {
        amount: true,
      },
    });

    const _totalEarnings = totalEarnings._sum.amount ?? new Prisma.Decimal(0);
    const _totalExpenses = totalExpenses._sum.amount ?? new Prisma.Decimal(0);
    const _totalInvestments =
      totalInvestments._sum.amount ?? new Prisma.Decimal(0);

    const total = _totalEarnings.plus(_totalExpenses).plus(_totalInvestments);

    const earningsPercentage = total.isZero()
      ? new Prisma.Decimal(0)
      : _totalEarnings.div(total).times(100);

    const expensesPercentage = total.isZero()
      ? new Prisma.Decimal(0)
      : _totalExpenses.div(total).times(100);

    const investmentsPercentage = total.isZero()
      ? new Prisma.Decimal(0)
      : _totalInvestments.div(total).times(100);

    const balance = _totalEarnings
      .minus(_totalExpenses)
      .minus(_totalInvestments);

    return {
      earnings: _totalEarnings,
      expenses: _totalExpenses,
      investments: _totalInvestments,
      earningsPercentage,
      expensesPercentage,
      investmentsPercentage,
      balance,
    };
  }
}
