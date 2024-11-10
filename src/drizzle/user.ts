import { sql } from "drizzle-orm";
import { text, timestamp } from "drizzle-orm/pg-core";

import { pgTable } from "drizzle-orm/pg-core";

import { serial } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  email: text().notNull().unique(),
  hashedPassword: text().notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: text().notNull(),
});

export const usersRoles = pgTable("users_roles", {
  userId: serial("user_id").references(() => users.id),
  roleId: serial("role_id").references(() => roles.id),
});
