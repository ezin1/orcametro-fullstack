import { Badge } from "@/app/_components/ui/badge";
import { Sellers, SellersStatus } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface SellerStatusBadgeProps {
  seller: Sellers;
}

const SellerStatusBadge = ({ seller }: SellerStatusBadgeProps) => {
  if (seller.sellerStatus === SellersStatus.ACTIVE) {
    return (
      <Badge className="bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon size={10} className="mr-2 fill-primary" />
        Ativo
      </Badge>
    );
  }
  if (seller.sellerStatus === SellersStatus.INACTIVE) {
    return (
      <Badge className="bg-danger text-danger hover:bg-danger bg-opacity-10 font-bold hover:bg-opacity-10">
        <CircleIcon size={10} className="fill-danger mr-2" />
        Inativo
      </Badge>
    );
  }
};

export default SellerStatusBadge;
