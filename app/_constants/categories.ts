import { CategoryType } from "@prisma/client";

export const CATEGORIES_TYPES = {
  PRODUCT: "Produto",
  SERVICE: "Serviço",
};

export const CATEGORIES_TYPES_OPTIONS = [
  {
    value: CategoryType.PRODUCT,
    label: CATEGORIES_TYPES.PRODUCT,
  },
  {
    value: CategoryType.SERVICE,
    label: CATEGORIES_TYPES.SERVICE,
  },
];
