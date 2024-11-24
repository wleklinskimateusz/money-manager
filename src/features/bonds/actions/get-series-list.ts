"use server";

import { db } from "@/drizzle/db";
import { bondSeries } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

const getSeriesListCached = cache(
  async (bondTypeId: number) => {
    return db
      .select({ id: bondSeries.id, serialNumber: bondSeries.serialNumber })
      .from(bondSeries)
      .where(eq(bondSeries.bondTypeId, bondTypeId));
  },
  ["bond-series-list"],
  {
    tags: ["bond-series-list"],
  },
);

export const getSeriesList = getSeriesListCached;
