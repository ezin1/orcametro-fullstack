"use client";

import * as React from "react";
import { PencilIcon } from "lucide-react";
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

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="icon">
          <PencilIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Form {...form}>
          <form>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Editar vendedor</DrawerTitle>
                <DrawerDescription></DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
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
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
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
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Digite a senha..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* <FormField
                control={form.control}
                name="sellerStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>

                    </FormControl>
                  </FormItem>
                )}
              /> */}
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
