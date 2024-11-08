import { roles, users, usersRoles } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";

export const getUser = async (id: number) => {
  const user = await db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      roles: roles.name,
    })
    .from(users)
    .leftJoin(usersRoles, eq(users.id, usersRoles.userId))
    .leftJoin(roles, eq(usersRoles.roleId, roles.id))
    .where(eq(users.id, id));

  if (!user.length) return null;

  const userWithRoles = {
    ...user[0],
    roles: user.map((u) => u.roles).filter((role) => role !== null),
  };

  return userWithRoles;
};
