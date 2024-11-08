"use server";

import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import bcrypt from "bcrypt";
import { err } from "neverthrow";
import { InternalServerError } from "@/errors/internal-server-error";
import { redirect } from "next/navigation";

export const register = async (user: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  try {
    await db.insert(users).values({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      hashedPassword,
    });
  } catch (error) {
    return err(new InternalServerError("Failed to register user", error));
  }

  redirect("/login");
};
