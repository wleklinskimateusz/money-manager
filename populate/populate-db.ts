import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

import { db } from "../src/drizzle/db";
import { populateBonds } from "./bonds/populate-bonds";

await populateBonds(db);

process.exit(0);
