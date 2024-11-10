import { defineConfig } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";
import { getConfig } from "@/config/getter";
import { dbCredentialsSchema } from "@/drizzle/db-config";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const config = getConfig(dbCredentialsSchema);

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  dialect: "postgresql",
  out: "src/drizzle/migrations",
  dbCredentials: config,
});
