import { z } from "zod";

export const deleteServiceSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteServiceSchema = z.infer<typeof deleteServiceSchema>;
