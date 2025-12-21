import z from "zod";
import { type Role } from "./internal";


export const RoleSchema = z.enum(["user", "model"]);

export const TextContentSchema = z.object({
  type: z.literal("text"),
  value: z.string(),
});

export const ContentSchema = z.union([TextContentSchema]);

export const ContentInputSchema = z.union([
  z.string(),
  ContentSchema,
  z.array(z.union([z.string(), ContentSchema])),
  
// Normalize input to an array of Content objects
]).transform((input) => {
  // Strings are converted to text Content objects
  if (typeof input === "string") {
    return [{ type: "text", value: input } as const];
  // Single Content objects are wrapped in an array
  } else if (!Array.isArray(input)) {
    return [input];
  } else {
    return input.map((item) =>
      typeof item === "string" ? { type: "text", value: item } as const : item
    );
  }
});
export type ContentInput = 
  | string
  | { type: "text"; value: string; }
  | Array<string | { type: "text"; value: string; }>;


export const MessageInputSchema = z.object({
  role: RoleSchema,
  content: ContentInputSchema,
});
export type MessageInput = {
  role: Role;
  content: ContentInput;
}