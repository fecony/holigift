import { z } from "zod";

export const CreateWishlistSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(500, {
      message: "Title cannot exceed limit.",
    }),
  url: z.string().url().optional().or(z.literal("")).describe("Link"),
  imageUrl: z.string().url().optional().or(z.literal("")).describe("Image"),
  notes: z.string().optional(),
  isPublic: z
    .boolean()
    .optional()
    .default(false)
    .describe("Allow others see what you wish"),
});
