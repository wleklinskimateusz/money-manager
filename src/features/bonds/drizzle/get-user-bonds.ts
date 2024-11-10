import { db } from "@/drizzle/db";
import { getCurrentUser } from "@/features/authentication/server/current-user";
import { eq } from "drizzle-orm";
import { bondPurchase, bondTypes } from "./schema";
import { unstable_cache as cache } from "next/cache";

async function getUserBonds(userId: number) {
  const result = await db
    .select({
      id: bondPurchase.id,
      userId: bondPurchase.userId,
      seriesName: bondTypes.name,
      purchaseDate: bondPurchase.purchaseDate,
      amount: bondPurchase.amount,
    })
    .from(bondPurchase)
    .innerJoin(bondTypes, eq(bondPurchase.bondSeriesId, bondTypes.id))
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
  if (user.isErr()) {
    return [];
  }
  return await cachedGetUserBonds(user.value.id);
};

export { getBonds as getUserBonds };
