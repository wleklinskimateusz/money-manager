"use server";

import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { getAuthUrl } from "../navigation/get-auth-url";
import { getLocale } from "@/locale/get-locale";

export const signup = async (user: {
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
    if (error instanceof Error && error.message.includes("UNIQUE")) {
      return {
        statusCode: 409,
      };
    }
    return {
      statusCode: 500,
    };
  }

  const lang = await getLocale();

  redirect(getAuthUrl(lang, "login"));
};
