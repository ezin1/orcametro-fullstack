import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/app/_components/ui/input-otp";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { updateStatusBudgetById } from "@/app/_data/budgets/budget-update";
import { verifyPasswordBySellerId } from "@/app/_data/sellers/sellers-info";
import { useToast } from "@/app/_hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { BudgetStatus } from "@prisma/client";
import { FileCheck2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

interface ButtonDialogValidatePDFProps {
  id: string;
  budgetStatus: BudgetStatus;
  sellerId: string;
}

const ButtonDialogValidatePDF = ({
  id,
  budgetStatus,
  sellerId,
}: ButtonDialogValidatePDFProps) => {
  console.log(budgetStatus);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    const verifyPassword = await verifyPasswordBySellerId(sellerId, data.pin);

    if (!verifyPassword) {
      toast({
        title: "Erro",
        description: "Código de vendedor inválido.",
        variant: "destructive",
      });

      return;
    }

    if (budgetStatus === "APPROVED") {
      toast({
        title: "Erro",
        description: "O orçamento selecionado já foi aprovado.",
        variant: "destructive",
      });

      return;
    }

    if (budgetStatus === "REJECTED") {
      toast({
        title: "Erro",
        description: "O orçamento selecionado já está com data expirada.",
        variant: "destructive",
      });

      return;
    }

    await updateStatusBudgetById({
      budgetId: id,
      budgetStatus: "APPROVED",
    });

    toast({
      title: "Venda realizada",
      description: "Venda realizada com sucesso.",
    });

    setIsDialogOpen(false);
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="text-white">
                <FileCheck2 />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-2 flex justify-center">
                  Realizar venda
                </DialogTitle>
                <DialogDescription>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-full space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="pin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mb-6 flex justify-center">
                              Por favor, insira o seu código de vendedor para
                              realizar a venda.
                            </FormLabel>
                            <FormControl>
                              <div className="flex justify-center">
                                <InputOTP maxLength={6} {...field}>
                                  <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                  </InputOTPGroup>
                                </InputOTP>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end">
                        <Button className="text-white" type="submit">
                          Enviar
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </TooltipTrigger>
        <TooltipContent>
          <p>Realizar venda</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ButtonDialogValidatePDF;
