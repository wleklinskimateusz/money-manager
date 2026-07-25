"use server";

import { db } from "@/drizzle/db";
import { and, eq } from "drizzle-orm";
import { incomeSources, monthlyIncomes } from "../drizzle/schema";
import { getCurrentUser } from "@/features/authentication/server/current-user";
import { revalidatePath } from "next/cache";
import type { MonthlyIncome } from "../types";

export async function addIncome(
  data: Omit<MonthlyIncome, "id" | "source"> & { sourceId: number },
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  // Verify that the income source belongs to the user
  const source = await db
    .select()
    .from(incomeSources)
    .where(
      and(
        eq(incomeSources.id, data.sourceId),
        eq(incomeSources.userId, user.id),
      ),
    );

  if (!source) throw new Error("Invalid income source");

  await db.insert(monthlyIncomes).values({
    incomeSourceId: data.sourceId,
    date: data.date,
    grossSalary: data.grossSalary,
    incomeTax: data.incomeTax,
    healthInsurance: data.healthInsurance,
    socialSecurity: data.socialSecurity,
    otherDeductions: data.otherDeductions,
    currency: data.currency,
  });

  revalidatePath("/budget/incomes");
}
