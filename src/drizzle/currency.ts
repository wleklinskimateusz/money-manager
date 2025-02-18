import { pgEnum } from "drizzle-orm/pg-core";

export const currency = pgEnum("currency", ["PLN", "EUR", "USD", "GBP"]);
export type Currency = (typeof currency.enumValues)[number];
