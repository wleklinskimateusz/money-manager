import { users, currency } from "@/drizzle/schema";
import {
  decimal,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// Enum for different types of income
export const incomeType = pgEnum("income_type", [
  "salary",
  "contract",
  "business",
  "other",
]);

// Main income sources table (e.g. different jobs)
export const incomeSources = pgTable("income_sources", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .references(() => users.id)
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(), // e.g. "Company Name"
  type: incomeType("type").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"), // null if current job
});

// Monthly income records
export const monthlyIncomes = pgTable("monthly_incomes", {
  id: serial("id").primaryKey(),
  incomeSourceId: serial("income_source_id")
    .references(() => incomeSources.id)
    .notNull(),
  month: timestamp("month").notNull(), // First day of the month
  grossSalary: decimal("gross_salary", { precision: 10, scale: 2 }).notNull(),
  incomeTax: decimal("income_tax", { precision: 10, scale: 2 }).notNull(),
  healthInsurance: decimal("health_insurance", {
    precision: 10,
    scale: 2,
  }).notNull(),
  socialSecurity: decimal("social_security", {
    precision: 10,
    scale: 2,
  }).notNull(),
  otherDeductions: decimal("other_deductions", {
    precision: 10,
    scale: 2,
  }).default("0"),
  netSalary: decimal("net_salary", { precision: 10, scale: 2 }).notNull(),
  currency: currency("currency").default("PLN").notNull(),
  notes: text("notes"),
});
