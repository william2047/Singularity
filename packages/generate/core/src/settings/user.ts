import z from "zod";
import { Settings } from "./internal";


export const SettingsSchema = z.object({
  temperature: z.number().min(0).max(1).optional(),
  maxTokens: z.number().min(1).optional(),
  topP: z.number().min(0).max(1).optional(),
  frequencyPenalty: z.number().min(-2).max(2).optional(),
  presencePenalty: z.number().min(-2).max(2).optional(),
})
type SettingsShape = typeof SettingsSchema.shape


export const SettingsAdditionInputSchema = z.object(
  Object.fromEntries(
    Object.entries(SettingsSchema.shape).map(([key, schema]) => [
      key,
      z.union([schema, z.literal("unset")])
    ])
  ) as {
    [K in keyof SettingsShape]:
      z.ZodUnion<[SettingsShape[K], z.ZodLiteral<"unset">]>
  }
)

export type SettingsAddition = {
  [K in keyof Settings]: Settings[K] | "unset";
};