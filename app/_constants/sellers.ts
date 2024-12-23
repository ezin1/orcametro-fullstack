import { SellerPermission, SellersStatus } from "@prisma/client";

export const SELLERS_STATUS = {
  ACTIVE: "Ativo",
  INACTIVE: "Inativo",
};

export const SELLERS_PERMISSIONS = {
  ADMIN: "Administrador",
  SELLER: "Vendedor",
};

export const SELLERS_PERMISSIONS_OPTIONS = [
  {
    value: SellerPermission.ADMIN,
    label: SELLERS_PERMISSIONS.ADMIN,
  },
  {
    value: SellerPermission.SELLER,
    label: SELLERS_PERMISSIONS.SELLER,
  },
];

export const SELLERS_STATUS_OPTIONS = [
  {
    value: SellersStatus.ACTIVE,
    label: SELLERS_STATUS.ACTIVE,
  },
  {
    value: SellersStatus.INACTIVE,
    label: SELLERS_STATUS.INACTIVE,
  },
];
