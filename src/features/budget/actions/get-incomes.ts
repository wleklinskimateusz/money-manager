"use server";

import { db } from "@/drizzle/db";
import { monthlyIncomes, incomeSources } from "../drizzle/schema";
import { eq, and, between } from "drizzle-orm";
import { getCurrentUser } from "@/features/authentication/server/current-user";
import type { MonthlyIncome } from "../types";

export async function getIncomes(year: number): Promise<MonthlyIncome[]> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const startDate = new Date(year, 0, 1); // January 1st of the year
  const endDate = new Date(year, 11, 31); // December 31st of the year

  const incomes = await db
    .select({
      id: monthlyIncomes.id,
      month: monthlyIncomes.month,
      source: incomeSources.name,
      grossSalary: monthlyIncomes.grossSalary,
      incomeTax: monthlyIncomes.incomeTax,
      healthInsurance: monthlyIncomes.healthInsurance,
      socialSecurity: monthlyIncomes.socialSecurity,
      otherDeductions: monthlyIncomes.otherDeductions,
      netSalary: monthlyIncomes.netSalary,
      currency: monthlyIncomes.currency,
    })
    .from(monthlyIncomes)
    .innerJoin(
      incomeSources,
      and(
        eq(monthlyIncomes.incomeSourceId, incomeSources.id),
        eq(incomeSources.userId, user.id),
      ),
    )
    .where(and(between(monthlyIncomes.month, startDate, endDate)))
    .orderBy(monthlyIncomes.month);

  return incomes;
}
