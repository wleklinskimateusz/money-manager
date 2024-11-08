import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
    id: int().primaryKey({ autoIncrement: true }),
    firstName: text().notNull(),
    lastName: text().notNull(),
    email: text().notNull().unique(),
    hashedPassword: text().notNull(),
    createdAt: int("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: int("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const roles = sqliteTable("roles", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
});

export const usersRoles = sqliteTable("users_roles", {
    userId: int("user_id").references(() => users.id),
    roleId: int("role_id").references(() => roles.id),
});
