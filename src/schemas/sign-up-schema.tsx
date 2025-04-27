import * as z from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Username is required.",
    })
    .refine((value) => !/\s/.test(value), {
      message: "Username cannot contain spaces.",
    })
    .refine((value) => value === value.toLowerCase(), {
      message: "Username cannot contain uppercase letters.",
    })
    .refine((value) => !value.includes("@"), {
      message: "Username cannot be an email.",
    }),
});
