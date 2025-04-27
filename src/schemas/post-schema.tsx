import * as z from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required." })
    .max(100, { message: "Title cannot exceed 100 characters." }),
  content: z
    .string()
    .min(1, { message: "Content is required." })
    .max(500, { message: "Content cannot exceed 500 characters." }),
});
