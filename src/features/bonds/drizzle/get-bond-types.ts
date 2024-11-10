import { db } from "@/drizzle/db";
import { bondTypes } from "./schema";

export const getBondTypes = () => {
  return db.select({ id: bondTypes.id, name: bondTypes.name }).from(bondTypes);
};
