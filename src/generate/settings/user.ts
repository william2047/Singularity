import z from "zod";

export const SettingsSchema = z.object({
  temperature: z.number().min(0).max(1).optional(),
  maxTokens: z.number().min(1).optional(),
  topP: z.number().min(0).max(1).optional(),
  frequencyPenalty: z.number().min(-2).max(2).optional(),
  presencePenalty: z.number().min(-2).max(2).optional(),
})

export const SettingsAdditionInputSchema = z.object({
  temperature: z.union([z.number().min(0).max(1), z.literal("unset")]).optional(),
  maxTokens: z.union([z.number().min(1), z.literal("unset")]).optional(),
  topP: z.union([z.number().min(0).max(1), z.literal("unset")]).optional(),
  frequencyPenalty: z.union([z.number().min(-2).max(2), z.literal("unset")]).optional(),
  presencePenalty: z.union([z.number().min(-2).max(2), z.literal("unset")]).optional(),
})
