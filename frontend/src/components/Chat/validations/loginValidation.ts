import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
