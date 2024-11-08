"use server";

import { db } from "@/drizzle/db";
import { roles, users, usersRoles } from "@/drizzle/schema";
import { NotFoundError } from "@/errors/not-found";
import { UnauthorizedError } from "@/errors/unauthorized";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { ok } from "neverthrow";
import { err } from "neverthrow";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { InternalServerError } from "@/errors/internal-server-error";
import { redirect } from "next/navigation";

const getUser = async (email: string) => {
  let user;
  try {
    user = await db
      .select({
        id: users.id,
        hashedPassword: users.hashedPassword,
        roles: roles.name,
      })
      .from(users)
      .leftJoin(usersRoles, eq(users.id, usersRoles.userId))
      .leftJoin(roles, eq(usersRoles.roleId, roles.id))
      .where(eq(users.email, email));
  } catch (error) {
    return err(new InternalServerError("Failed to get user", error));
  }

  if (!user.length) return err(new NotFoundError("User not found"));

  const userWithRoles = {
    ...user[0],
    roles: user.map((u) => u.roles).filter((role) => role !== null),
  };

  return ok(userWithRoles);
};

const encryptSession = ({ id, roles }: { id: number; roles: string[] }) => {
  const secretKey = process.env.SESSION_SECRET;
  if (!secretKey) throw new Error("SESSION_SECRET is not set");

  const encodedKey = new TextEncoder().encode(secretKey);
  return new SignJWT({ id, roles })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
};

export const login = async (email: string, password: string) => {
  const userResult = await getUser(email);
  if (!userResult.isOk()) return err(userResult.error);

  const user = userResult.value;

  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
  if (!isPasswordValid) return err(new UnauthorizedError("Invalid password"));

  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encryptSession({
    id: user.id,
    roles: user.roles,
  });
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  redirect("/");
};
