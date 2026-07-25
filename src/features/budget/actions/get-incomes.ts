"use server";

import { db } from "@/drizzle/db";
import { incomeSources, monthlyIncomes } from "../drizzle/schema";
import { and, between, eq } from "drizzle-orm";
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
      date: monthlyIncomes.date,
      source: incomeSources.name,
      grossSalary: monthlyIncomes.grossSalary,
      incomeTax: monthlyIncomes.incomeTax,
      healthInsurance: monthlyIncomes.healthInsurance,
      socialSecurity: monthlyIncomes.socialSecurity,
      otherDeductions: monthlyIncomes.otherDeductions,
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
    .where(and(between(monthlyIncomes.date, startDate, endDate)))
    .orderBy(monthlyIncomes.date);

  return incomes;
}
