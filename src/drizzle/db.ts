import { drizzle } from "drizzle-orm/node-postgres";

import { dbCredentialsSchema } from "./db-config";
import { getConfig } from "@/config/getter";
import { Client } from "pg";

const config = getConfig(dbCredentialsSchema);

const client = new Client(config);

await client.connect();

export const db = drizzle(client);
