"use client";

import React, { useState } from "react";
import { Eye, EyeOff, PencilIcon } from "lucide-react";
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

interface EditSellerDrawerProps {
  seller: {
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
  sellerPassword: z
    .string()
    .min(6, { message: "Senha muito curta" })
    .max(6, { message: "Senha muito longa" }),
  sellerStatus: z.nativeEnum(SellersStatus, {
    required_error: "Status é obrigatório",
  }),
  sellerPermission: z.nativeEnum(SellerPermission, {
    required_error: "Permissão é obrigatória",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export function DrawerEditSeller({ seller }: EditSellerDrawerProps) {
  const [isViewPassword, setIsViewPassword] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: seller.name,
      document: seller.document,
      sellerPassword: seller.sellerPassword,
      sellerStatus: seller.sellerStatus,
      sellerPermission: seller.sellerPermission,
    },
  });

  const onSubmit = async (data: FormSchema) => {
    console.log(data);
  };

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
                      <FormControl>
                        <Input placeholder="Digite o CPF..." {...field} />
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
                      <FormControl>
                        <div className="relative flex-1">
                          <Input
                            type={isViewPassword ? "text" : "password"}
                            placeholder="Digite a senha..."
                            {...field}
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
