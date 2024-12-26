"use client";

import React, { useState, useEffect } from "react";
import {
  CircleAlertIcon,
  Eye,
  EyeOff,
  Loader2Icon,
  PencilIcon,
} from "lucide-react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/_components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SellersStatus, SellerPermission } from "@prisma/client";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  SELLERS_PERMISSIONS_OPTIONS,
  SELLERS_STATUS_OPTIONS,
} from "@/app/_constants/sellers";
import { AlertDestructive } from "@/app/_components/alert-dialog";
import { validateCPF } from "@/app/utils/validate-cpf";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { sellerRegister } from "@/app/_data/seller-register";

interface EditSellerDrawerProps {
  seller: {
    sellerId: string;
    name: string;
    document: string;
    sellerPassword: string;
    sellerStatus: SellersStatus;
    sellerPermission: SellerPermission;
  };
}

const formSchema = z.object({
  name: z.string().min(3, { message: "Nome muito curto" }),
  document: z.string().length(11, { message: "CPF deve conter 11 caracteres" }),
  sellerPassword: z.string().min(6, { message: "Senha muito curta" }),
  sellerStatus: z.nativeEnum(SellersStatus, {
    required_error: "Status é obrigatório",
  }),
  sellerPermission: z.nativeEnum(SellerPermission, {
    required_error: "Permissão é obrigatória",
  }),
});

export type FormSchemaSellerRegister = z.infer<typeof formSchema> & {
  sellerId: string;
};

export function DrawerEditSeller({ seller }: EditSellerDrawerProps) {
  const [formData, setFormData] = useState({
    document: seller.document,
    password: seller.sellerPassword,
  });
  const [isViewPassword, setIsViewPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [validateCpf, setValidateCpf] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);
  const [sellerRegisterIsLoading, setSellerRegisterIsLoading] = useState(false);
  const form = useForm<FormSchemaSellerRegister>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: seller.name,
      document: seller.document,
      sellerStatus: seller.sellerStatus,
      sellerPermission: seller.sellerPermission,
    },
  });

  const onChangeFormatDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (value.length === 11) {
      const verifyDocument = validateCPF(value);

      if (!verifyDocument) {
        form.setError("document", {
          type: "manual",
          message: "CPF inválido",
        });
        setValidateCpf(false);
      }
      formattedValue = value.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})/,
        "$1.$2.$3-$4",
      );

      if (verifyDocument) {
        setValidateCpf(true);
        form.clearErrors("document");
      }
    }

    console.log(formattedValue, "fasdjad");

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const onChangeVerifyPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.length < 6) {
      form.setError("sellerPassword", {
        type: "manual",
        message: "Senha muito curta",
      });
      setValidatePassword(false);
    } else if (value.length > 6) {
      form.setError("sellerPassword", {
        type: "manual",
        message: "Senha muito longa",
      });
      setValidatePassword(false);
    } else {
      setValidatePassword(true);
      form.clearErrors("sellerPassword");
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (data: FormSchemaSellerRegister) => {
    try {
      setSellerRegisterIsLoading(true);

      const verifyDocument = validateCPF(data.document);

      if (!verifyDocument) {
        form.setError("document", {
          type: "manual",
          message: "CPF inválido",
        });
        setValidateCpf(false);
      }

      if (data.sellerPassword.length < 6) {
        form.setError("sellerPassword", {
          type: "manual",
          message: "Senha muito curta",
        });
        setValidatePassword(false);
      }

      if (data.sellerPassword.length > 6) {
        form.setError("sellerPassword", {
          type: "manual",
          message: "Senha muito longa",
        });
        setValidatePassword(false);
      }

      if (!verifyDocument || data.sellerPassword.length < 6) {
        return;
      }

      await sellerRegister(data);
    } catch (error) {
      console.error(error);
    } finally {
      setSellerRegisterIsLoading(false);
    }

    await sellerRegister(data);
  };

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [form.formState.errors]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="icon">
          <PencilIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle className="font-bold">Editar vendedor</DrawerTitle>
                <DrawerDescription>
                  Realize as alterações necessárias e salve para editar seu
                  vendedor
                </DrawerDescription>
              </DrawerHeader>
              {showAlert && <AlertDestructive />}
              <div className="space-y-2 p-4 pb-0">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-3">
                      <FormLabel className="text-sm font-bold">Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o nome..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="document"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-3">
                      <FormLabel className="text-sm font-bold">CPF</FormLabel>
                      {!validateCpf && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger disabled>
                              {" "}
                              <CircleAlertIcon className="text-destructive" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Insira um CPF válido!</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      <FormControl>
                        <Input
                          placeholder="Digite o CPF..."
                          {...field}
                          value={formData.document}
                          onChange={(e) => {
                            field.onChange(e);
                            onChangeFormatDocument(e);
                          }}
                          accept="number"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sellerPassword"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-3">
                      <FormLabel className="text-sm font-bold">Senha</FormLabel>
                      {!validatePassword && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger disabled>
                              {" "}
                              <CircleAlertIcon className="text-destructive" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Insira uma senha de exatamente 6 dígitos!</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      <FormControl>
                        <div className="relative flex-1">
                          <Input
                            type={isViewPassword ? "text" : "password"}
                            placeholder="Digite a senha..."
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              onChangeVerifyPassword(e);
                            }}
                          />
                          {isViewPassword ? (
                            <EyeOff
                              className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer"
                              onClick={() => setIsViewPassword(false)}
                            />
                          ) : (
                            <Eye
                              className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer"
                              onClick={() => setIsViewPassword(true)}
                            />
                          )}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sellerPermission"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-3">
                      <FormLabel className="text-sm font-bold">
                        Permissão
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um tipo de permissão" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SELLERS_PERMISSIONS_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sellerStatus"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-3">
                      <FormLabel className="text-sm font-bold">
                        Status
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status do vendedor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SELLERS_STATUS_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <DrawerFooter className="flex flex-row justify-between">
                <DrawerClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DrawerClose>
                <Button className="text-white" type="submit">
                  {sellerRegisterIsLoading && (
                    <Loader2Icon className="animate-spin" />
                  )}
                  Salvar
                </Button>
              </DrawerFooter>
            </div>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
