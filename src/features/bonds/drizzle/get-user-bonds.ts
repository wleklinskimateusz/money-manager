import { db } from "@/drizzle/db";
import { getCurrentUser } from "@/features/authentication/server/current-user";
import { eq } from "drizzle-orm";
import {
  bondPurchase,
  bondSeries,
  bondTypes,
  fixedBondParameters,
} from "./schema";
import { unstable_cache as cache } from "next/cache";

async function getUserBonds(userId: number) {
  const result = await db
    .select({
      id: bondPurchase.id,
      userId: bondPurchase.userId,
      seriesName: bondTypes.name,
      purchaseDate: bondPurchase.purchaseDate,
      amount: bondPurchase.amount,
      length: bondSeries.length,
      lengthUnit: bondSeries.lengthUnit,
      costOfWithdrawal: bondSeries.costOfWithdrawal,
      interestRate: fixedBondParameters.interestRate,
    })
    .from(bondPurchase)
    .innerJoin(bondSeries, eq(bondPurchase.bondSeriesId, bondSeries.id))
    .innerJoin(bondTypes, eq(bondSeries.bondTypeId, bondTypes.id))
    .innerJoin(
      fixedBondParameters,
      eq(bondSeries.id, fixedBondParameters.bondSeriesId),
    )
    .where(eq(bondPurchase.userId, userId));

  return result.map((bond) => ({
    ...bond,
    purchaseDate: bond.purchaseDate.getTime(),
  }));
}

const cachedGetUserBonds = cache(getUserBonds, ["user-bonds"], {
  tags: ["user-bonds"],
});

const getBonds = async () => {
  const user = await getCurrentUser();
  return await cachedGetUserBonds(user.id);
};

export { getBonds as getUserBonds };
