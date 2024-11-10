import { InternalServerError } from "@/errors/internal-server-error";
import { jwtVerify } from "jose";
import { err, ok } from "neverthrow";
import { cookies } from "next/headers";
import { z } from "zod";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return ok(payload);
  } catch (error) {
    return err(new InternalServerError("Unauthorized", error));
  }
}

const sessionSchema = z.object({
  id: z.number(),
  roles: z.array(z.string()),
});

export const getCurrentUser = async () => {
  const session = (await cookies()).get("session")?.value;
  const decryptionResult = await decrypt(session);
  if (!decryptionResult.isOk()) return err(decryptionResult.error);

  const parsed = sessionSchema.safeParse(decryptionResult.value);
  if (!parsed.success)
    return err(new InternalServerError("Invalid session", parsed.error));

  return ok(parsed.data);
};
