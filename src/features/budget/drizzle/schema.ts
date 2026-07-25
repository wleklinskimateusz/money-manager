import { currency, users } from "@/drizzle/schema";
import {
  pgEnum,
  pgTable,
  real,
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
  date: timestamp("date").notNull(),
  grossSalary: real("gross_salary").notNull(),
  incomeTax: real("income_tax").notNull(),
  healthInsurance: real("health_insurance").notNull(),
  socialSecurity: real("social_security").notNull(),
  otherDeductions: real("other_deductions").notNull().default(0),
  currency: currency("currency").default("PLN").notNull(),
  notes: text("notes"),
});
