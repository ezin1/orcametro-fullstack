import { Button } from "@/app/_components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/app/_components/ui/drawer";

import { EyeIcon } from "lucide-react";
import { useState } from "react";

interface DrawerViewBudgetInfoProps {
  budget: {
    id: string;
    clientName: string;
    value: number;
    createdAt: Date;
  };
}

export function DrawerViewBudgetInfo({ budget }: DrawerViewBudgetInfoProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger>
        <Button
          size="icon"
          className="text-white"
          onClick={() => setIsDrawerOpen(true)}
        >
          <EyeIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col space-y-4">
          <h1 className="text-lg font-bold">Informações do Orçamento</h1>
          <div className="flex flex-col space-y-2">
            <span>
              <strong>Cliente:</strong> {budget.clientName}
            </span>
            <span>
              <strong>Valor:</strong> R$ {budget.value}
            </span>
            <span>
              <strong>Data:</strong>{" "}
              {new Date(budget.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
