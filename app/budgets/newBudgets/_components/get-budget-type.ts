import { BudgetType } from "@prisma/client";
import { ProductsFull, ServicesFull } from "./generate-budget-component";

interface getBudgetTypeProps {
  products: Array<ProductsFull>;
  services: Array<ServicesFull>;
}
function getBudgetType({ products, services }: getBudgetTypeProps) {
  if (products.length > 0 && services.length > 0) {
    return BudgetType.HYBRID;
  } else if (products.length > 0) {
    return BudgetType.PRODUCT;
  } else if (services.length > 0) {
    return BudgetType.SERVICE;
  }
}

export default getBudgetType;
