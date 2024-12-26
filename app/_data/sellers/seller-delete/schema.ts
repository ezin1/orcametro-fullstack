import { z } from "zod";

export const deleteSellerSchema = z.object({
  sellerId: z.string().uuid(),
});

export type DeleteSellerSchema = z.infer<typeof deleteSellerSchema>;
