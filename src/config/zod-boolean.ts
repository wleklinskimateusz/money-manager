import { z } from "zod";

const boolStringSchema = z.union([z.literal("true"), z.literal("false")]);
type BoolString = z.infer<typeof boolStringSchema>;

export function zodBooleanWithDefault(defaultValue: boolean) {
  return boolStringSchema
    .default(defaultValue.toString() as BoolString)
    .transform((v) => v !== "false");
}
