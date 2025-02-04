import { Button } from "@/app/_components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/_components/ui/drawer";
import { LabeledCard } from "@/app/_components/ui/labeled-card";
import { LabeledInfo } from "@/app/_components/ui/labeled-info";

import { EyeIcon } from "lucide-react";
import { useState } from "react";
import BadgeBudgetStatus from "./badge-budget-status";
import BadgeBudgetType from "./badge-budget-type";
import { BudgetStatus, BudgetType } from "@prisma/client";

interface DrawerViewBudgetInfoProps {
  budget: {
    id: string;
    clientName: string;
    clientEmail: string;
    clientDocument: string;
    clientPhone: string;
    sellerId: string;
    value: number;
    createdAt: Date;
    description: string;
    budgetStatus: BudgetStatus;
    expirationDate: Date;
    budgetObservation: string;
    budgetType: BudgetType;
    sellerName: string;
    updatedAt: Date;
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
        <div className="mx-auto w-full">
          <DrawerHeader className="space-y-3">
            <DrawerTitle className="font-bold">
              Informações do Orçamento
            </DrawerTitle>
            <DrawerDescription className="flex justify-between">
              <div>{budget.description}</div>
              <div className="space-x-2">
                <BadgeBudgetType budgetType={budget.budgetType} />
                <BadgeBudgetStatus
                  budgetStatus={budget.budgetStatus}
                  createdAt={budget.createdAt}
                  updatedAt={budget.updatedAt}
                  expirationDate={budget.expirationDate}
                />
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <div className="space-y-5 pb-0">
            <LabeledCard label="Informações do Cliente">
              <div className="space-y-3">
                <div className="grid grid-cols-2 justify-between gap-4">
                  <LabeledInfo label="Cliente" content={budget.clientName} />
                  <LabeledInfo
                    label="Documento"
                    content={budget.clientDocument}
                  />
                </div>
                <div className="grid grid-cols-2 justify-between gap-4">
                  <LabeledInfo label="E-mail" content={budget.clientEmail} />
                  <LabeledInfo label="Telefone" content={budget.clientPhone} />
                </div>
              </div>
            </LabeledCard>
            <LabeledCard label="Informações do Orçamento">
              <div className="space-y-3">
                <div className="grid grid-cols-[auto,auto] gap-4">
                  <LabeledInfo label="Vendedor" content={budget.sellerName} />
                  <LabeledInfo
                    label="Valor"
                    content={budget.value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  />
                </div>
                <div className="grid grid-cols-2 justify-between gap-4">
                  <LabeledInfo
                    label="Data de criação"
                    content={new Date(budget.createdAt).toLocaleDateString(
                      "pt-BR",
                    )}
                  />
                  <LabeledInfo
                    label="Data de expiração"
                    content={new Date(budget.expirationDate).toLocaleDateString(
                      "pt-BR",
                    )}
                  />
                </div>
                <LabeledInfo
                  label="Observações"
                  content={budget.budgetObservation}
                />
              </div>
            </LabeledCard>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
