"use server";

import { db } from "@/drizzle/db";
import { bondPurchase } from "@/drizzle/schema";
import { getCurrentUser } from "@/features/authentication/server/current-user";
import { revalidateTag } from "next/cache";

export const createBondPurchase = async ({
  bondSeriesId,
  date,
  amount,
}: {
  bondSeriesId: number;
  date: Date;
  amount: number;
}) => {
  const userResult = await getCurrentUser();
  if (userResult.isErr()) {
    throw new Error("User not found");
  }
  await db.insert(bondPurchase).values({
    userId: userResult.value.id,
    bondSeriesId,
    purchaseDate: date,
    amount: amount,
  });
  revalidateTag("user-bonds");
};
