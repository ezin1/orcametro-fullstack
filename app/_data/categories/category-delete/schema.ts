import { z } from "zod";

export const deleteCategorySchema = z.object({
  id: z.string().uuid(),
});

export type DeleteCategorySchema = z.infer<typeof deleteCategorySchema>;
