import { users } from "@/drizzle/user";
import {
  integer,
  pgEnum,
  real,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const bondKind = pgEnum("bond_kind", [
  "fixed",
  "inflation",
  "interest-rates",
]);

export type BondKind = (typeof bondKind.enumValues)[number];

export const capitalisationPeriod = pgEnum("capitalisation_period", [
  "yearly",
  "monthly",
  "weekly",
  "daily",
]);

export type CapitalisationPeriod =
  (typeof capitalisationPeriod.enumValues)[number];

export const lengthUnit = pgEnum("length_unit", ["years", "months"]);

export type LengthUnit = (typeof lengthUnit.enumValues)[number];

export const bondTypes = pgTable("bond_types", {
  id: serial("id").primaryKey(),
  name: text().notNull(),
  type: bondKind("type").notNull(),
});

export const bondSeries = pgTable("bond_series", {
  id: serial("id").primaryKey(),
  serialNumber: text("serial_number").notNull(),
  bondTypeId: serial("bond_type_id").references(() => bondTypes.id),
  issueDate: timestamp("issue_date").notNull(),
  initialValue: real("initial_value").notNull(),
  costOfWithdrawal: real("cost_of_withdrawal").notNull(),
  length: integer("length").notNull(),
  lengthUnit: lengthUnit("length_unit").notNull(),
});

export const fixedBondParameters = pgTable("fixed_bond_parameters", {
  id: serial("id").primaryKey(),
  bondSeriesId: serial("bond_series_id").references(() => bondSeries.id),
  interestRate: real("interest_rate").notNull(),
  capitalisationPeriod: capitalisationPeriod("capitalisation_period").notNull(),
});

export const indexedBy = pgEnum("indexed_by", ["interest_rate", "inflation"]);

export const variableBondParameters = pgTable("variable_bond_parameters", {
  id: serial("id").primaryKey(),
  bondSeriesId: serial("bond_series_id").references(() => bondSeries.id),
  firstPeriodRate: real("first_period_rate").notNull(),
  additionalRate: real("additional_rate").notNull(),
  indexedBy: indexedBy("indexed_by").notNull(),
});

export const inflationRate = pgTable("inflation_rate", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(), // point to the start of the period
  value: real("value").notNull(),
});

export const interestRate = pgTable("interest_rate", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(), // point to the start of the period
  value: real("value").notNull(),
});

export const bondPurchase = pgTable("bond_purchase", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .references(() => users.id)
    .notNull(),
  bondSeriesId: serial("bond_series_id")
    .references(() => bondSeries.id)
    .notNull(),
  purchaseDate: timestamp("purchase_date").notNull(),
  amount: integer("amount").notNull(),
});
