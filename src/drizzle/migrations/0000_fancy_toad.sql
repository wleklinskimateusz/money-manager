CREATE TYPE "public"."currency" AS ENUM('PLN', 'EUR', 'USD', 'GBP');--> statement-breakpoint
CREATE TYPE "public"."bond_kind" AS ENUM('fixed', 'inflation', 'interest-rates');--> statement-breakpoint
CREATE TYPE "public"."capitalisation_period" AS ENUM('yearly', 'monthly', 'weekly', 'daily');--> statement-breakpoint
CREATE TYPE "public"."indexed_by" AS ENUM('interest_rate', 'inflation');--> statement-breakpoint
CREATE TYPE "public"."length_unit" AS ENUM('years', 'months');--> statement-breakpoint
CREATE TYPE "public"."income_type" AS ENUM('salary', 'contract', 'business', 'other');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"email" text NOT NULL,
	"hashedPassword" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_roles" (
	"user_id" serial NOT NULL,
	"role_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bond_purchase" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"bond_series_id" serial NOT NULL,
	"purchase_date" timestamp NOT NULL,
	"amount" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bond_series" (
	"id" serial PRIMARY KEY NOT NULL,
	"serial_number" text NOT NULL,
	"bond_type_id" serial NOT NULL,
	"issue_date" timestamp NOT NULL,
	"initial_value" real NOT NULL,
	"cost_of_withdrawal" real NOT NULL,
	"length" integer NOT NULL,
	"length_unit" "length_unit" NOT NULL,
	"currency" "currency" DEFAULT 'PLN' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bond_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" "bond_kind" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fixed_bond_parameters" (
	"id" serial PRIMARY KEY NOT NULL,
	"bond_series_id" serial NOT NULL,
	"interest_rate" real NOT NULL,
	"capitalisation_period" "capitalisation_period" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inflation_rate" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" timestamp NOT NULL,
	"value" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "interest_rate" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" timestamp NOT NULL,
	"value" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "variable_bond_parameters" (
	"id" serial PRIMARY KEY NOT NULL,
	"bond_series_id" serial NOT NULL,
	"first_period_rate" real NOT NULL,
	"additional_rate" real NOT NULL,
	"indexed_by" "indexed_by" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "income_sources" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" "income_type" NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "monthly_incomes" (
	"id" serial PRIMARY KEY NOT NULL,
	"income_source_id" serial NOT NULL,
	"date" timestamp NOT NULL,
	"gross_salary" real NOT NULL,
	"income_tax" real NOT NULL,
	"health_insurance" real NOT NULL,
	"social_security" real NOT NULL,
	"other_deductions" real DEFAULT 0 NOT NULL,
	"currency" "currency" DEFAULT 'PLN' NOT NULL,
	"notes" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bond_purchase" ADD CONSTRAINT "bond_purchase_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bond_purchase" ADD CONSTRAINT "bond_purchase_bond_series_id_bond_series_id_fk" FOREIGN KEY ("bond_series_id") REFERENCES "public"."bond_series"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bond_series" ADD CONSTRAINT "bond_series_bond_type_id_bond_types_id_fk" FOREIGN KEY ("bond_type_id") REFERENCES "public"."bond_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fixed_bond_parameters" ADD CONSTRAINT "fixed_bond_parameters_bond_series_id_bond_series_id_fk" FOREIGN KEY ("bond_series_id") REFERENCES "public"."bond_series"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "variable_bond_parameters" ADD CONSTRAINT "variable_bond_parameters_bond_series_id_bond_series_id_fk" FOREIGN KEY ("bond_series_id") REFERENCES "public"."bond_series"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "income_sources" ADD CONSTRAINT "income_sources_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "monthly_incomes" ADD CONSTRAINT "monthly_incomes_income_source_id_income_sources_id_fk" FOREIGN KEY ("income_source_id") REFERENCES "public"."income_sources"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
