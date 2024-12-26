import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { sellerDelete } from "@/app/_data/sellers/seller-delete";
import { TrashIcon } from "lucide-react";

interface DeleteSellerButtonProps {
  sellerId: string;
}

const DeleteSellerButton = ({ sellerId }: DeleteSellerButtonProps) => {
  console.log(sellerId, "sellerId");
  const handleConfirmDeleteClick = async () => {
    try {
      console.log(sellerId, "sellerId");
      await sellerDelete({ sellerId });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="outline">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você deseja realmente deletar esse vendedor?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDeleteClick}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSellerButton;
