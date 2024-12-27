import { Badge } from "@/app/_components/ui/badge";
import { Categories, CategoryType } from "@prisma/client";
import { Package, Wrench } from "lucide-react";

interface CategoryTypeBadgeProps {
  category: Categories;
}

const CategoryTypeBadge = ({ category }: CategoryTypeBadgeProps) => {
  if (category.categoryType === CategoryType.PRODUCT) {
    return (
      <Badge className="">
        <Package size={10} className="mr-2" />
        Produto
      </Badge>
    );
  }
  if (category.categoryType === CategoryType.SERVICE) {
    return (
      <Badge className="bg-[hsl(188,86%,53%)] hover:bg-[hsl(188,86%,43%)]">
        <Wrench size={10} className="mr-2" />
        Serviço
      </Badge>
    );
  }
};

export default CategoryTypeBadge;
