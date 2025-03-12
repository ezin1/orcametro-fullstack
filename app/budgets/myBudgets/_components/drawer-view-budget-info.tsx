import { Button } from "@/app/_components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
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
import { BudgetStatus, BudgetType, Prisma } from "@prisma/client";
import ButtonViewBudgetPDF from "./button-view-budget-pdf";
import ButtonDialogValidatePDF from "./button-dialog-validate-budget";
import { SelectLabelInBorder } from "@/app/_components/ui/select-label-in-border";
import {
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/app/_components/ui/select";
import ButtonSendBudgetMail from "./button-send-budget-email";
import ButtonSendBudgetWhats from "./button-send-budget-whats";

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
    budgetPdf: string;
    products: Prisma.JsonValue;
    services: Prisma.JsonValue;
  };
}

export function DrawerViewBudgetInfo({ budget }: DrawerViewBudgetInfoProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const productsArray =
    typeof budget.products === "string"
      ? JSON.parse(budget.products)
      : budget.products;
  const servicesArray =
    typeof budget.services === "string"
      ? JSON.parse(budget.services)
      : budget.services;
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
                <BadgeBudgetStatus
                  budgetStatus={budget.budgetStatus}
                  createdAt={budget.createdAt}
                  updatedAt={budget.updatedAt}
                  expirationDate={budget.expirationDate}
                />
                <BadgeBudgetType budgetType={budget.budgetType} />
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
              <div className="space-y-4">
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
                  <SelectLabelInBorder label="Produtos">
                    <SelectValue placeholder="Visualizar os produtos" />
                    <SelectContent>
                      {Array.isArray(productsArray) &&
                        productsArray.map((option) => (
                          <SelectItem key={option.id} value={option.name}>
                            {option.name} - {option.quantity} -{" "}
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(option.valueTotal))}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </SelectLabelInBorder>
                  <SelectLabelInBorder label="Serviços">
                    <SelectValue placeholder="Visualizar os serviços" />
                    <SelectContent>
                      {Array.isArray(servicesArray) &&
                        servicesArray.map((option) => (
                          <SelectItem key={option.id} value={option.name}>
                            {option.name} - {option.quantity} -{" "}
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(option.valueTotal))}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </SelectLabelInBorder>
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
                  content={budget.budgetObservation || "Sem observações"}
                />
              </div>
            </LabeledCard>
          </div>
          <DrawerFooter className="flex flex-row justify-between">
            <DrawerClose asChild>
              <Button
                onClick={() => setIsDrawerOpen(false)}
                variant="secondary"
              >
                Fechar
              </Button>
            </DrawerClose>

            <div className="flex flex-row space-x-2">
              <ButtonSendBudgetMail />
              <ButtonSendBudgetWhats />
              <ButtonViewBudgetPDF pdfBase64={budget.budgetPdf} />
              <ButtonDialogValidatePDF
                id={budget.id}
                sellerId={budget.sellerId}
                budgetStatus={budget.budgetStatus}
              />
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
