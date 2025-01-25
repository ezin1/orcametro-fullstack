"use client";

import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Loader2Icon,
  PencilIcon,
  UserRoundPlus,
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
} from "@/app/_components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SellersStatus, SellerPermission, Users } from "@prisma/client";

import {
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  SELLERS_PERMISSIONS_OPTIONS,
  SELLERS_STATUS_OPTIONS,
} from "@/app/_constants/sellers";
import { AlertDestructive } from "@/app/_components/alert-dialog";
import { validateCPF } from "@/app/utils/validate-cpf";
import { sellerUpsert } from "@/app/_data/sellers/seller-upsert";
import { InputLabelInBorder } from "@/app/_components/ui/input-label-in-border";
import { SelectLabelInBorder } from "@/app/_components/ui/select-label-in-border";
import { verifyIfUserExistsByEmail } from "@/app/_data/users/users-info";
import { updateUserPlan } from "@/app/_data/users/users-plan";

interface UpsertSellerDrawerProps {
  userInfo: Users;
  seller?: {
    sellerId: string;
    name: string;
    document: string;
    email: string;
    sellerPassword: string;
    sellerStatus: SellersStatus;
    sellerPermission: SellerPermission;
  };
  isUpdate: boolean;
}

const formSchema = z.object({
  name: z.string().min(3, { message: "Nome muito curto" }),
  document: z.string().length(11, { message: "CPF deve conter 11 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  sellerPassword: z
    .string()
    .length(6, { message: "Senha deve conter exatamente 6 caracteres" }),
  sellerStatus: z.nativeEnum(SellersStatus, {
    required_error: "Status é obrigatório",
  }),
  sellerPermission: z.nativeEnum(SellerPermission, {
    required_error: "Permissão é obrigatória",
  }),
});

export type FormSchemaSellerUpsert = z.infer<typeof formSchema> & {
  sellerId: string | null | undefined;
};

export function DrawerUpsertSeller({
  userInfo,
  seller,
  isUpdate,
}: UpsertSellerDrawerProps) {
  const [formData, setFormData] = useState({
    document: seller?.document || "",
    password: seller?.sellerPassword || "",
  });
  const [isViewPassword, setIsViewPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [validateCpf, setValidateCpf] = useState(true);
  const [validatePassword, setValidatePassword] = useState(true);
  const [sellerRegisterIsLoading, setSellerRegisterIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const form = useForm<FormSchemaSellerUpsert>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: seller?.name || "",
      email: seller?.email || "",
      document: seller?.document || "",
      sellerStatus: seller?.sellerStatus || "ACTIVE",
      sellerPassword: seller?.sellerPassword || "",
      sellerPermission: seller?.sellerPermission || "SELLER",
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

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const onChangeVerifyPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.length !== 6) {
      form.setError("sellerPassword", {
        type: "manual",
        message: "Senha deve conter exatamente 6 caracteres",
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

  const onSubmit = async (data: FormSchemaSellerUpsert) => {
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

      if (data.sellerPassword.length !== 6) {
        form.setError("sellerPassword", {
          type: "manual",
          message: "Senha deve conter exatamente 6 caracteres",
        });
        setValidatePassword(false);
      }

      if (!verifyDocument || data.sellerPassword.length !== 6) {
        return;
      }
      data = { ...data, sellerId: seller?.sellerId };

      if (!isUpdate) {
        const verifyUserEmail = await verifyIfUserExistsByEmail(data.email);

        if (verifyUserEmail.user) {
          await updateUserPlan({
            plan: userInfo.userPlan,
            userIdSeller: verifyUserEmail.user.userId,
          });
        }
      }

      await sellerUpsert(data);

      setIsDrawerOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setSellerRegisterIsLoading(false);
    }
  };

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [form.formState.errors]);

  useEffect(() => {
    if (seller) {
      form.reset({
        name: seller.name,
        email: seller.email,
        document: seller.document,
        sellerStatus: seller.sellerStatus,
        sellerPassword: seller.sellerPassword,
        sellerPermission: seller.sellerPermission,
      });
    }
  }, [seller, form]);

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Button
          size="icon"
          className="text-white"
          onClick={() => setIsDrawerOpen(true)}
        >
          {isUpdate ? <PencilIcon /> : <UserRoundPlus />}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle className="font-bold">
                  {isUpdate ? "Editar" : "Cadastrar"} vendedor
                </DrawerTitle>
                <DrawerDescription>
                  {isUpdate
                    ? "Realize as alterações necessárias e salve para editar seu vendedor"
                    : "Preencha os campos abaixo para cadastrar um novo vendedor"}
                </DrawerDescription>
              </DrawerHeader>
              {showAlert && <AlertDestructive />}
              <div className="space-y-5 p-4 pb-0">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputLabelInBorder
                          label="Nome"
                          placeholder="Digite o nome..."
                          {...field}
                          error={!!form.formState.errors.name}
                          errorMessage={form.formState.errors.name?.message}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-3 pt-3">
                      <FormControl>
                        <InputLabelInBorder
                          label="Email"
                          {...field}
                          error={!!form.formState.errors.email}
                          errorMessage={form.formState.errors.email?.message}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="document"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputLabelInBorder
                          label="CPF"
                          placeholder="Digite o CPF..."
                          {...field}
                          value={formData.document}
                          onChange={(e) => {
                            field.onChange(e);
                            onChangeFormatDocument(e);
                          }}
                          accept="number"
                          error={
                            !validateCpf || !!form.formState.errors.document
                          }
                          errorMessage={
                            form.formState.errors.document?.message ||
                            "CPF inválido"
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sellerPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative flex-1">
                          <InputLabelInBorder
                            label="Senha"
                            type={isViewPassword ? "text" : "password"}
                            placeholder="Digite a senha..."
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              onChangeVerifyPassword(e);
                            }}
                            error={
                              !validatePassword ||
                              !!form.formState.errors.sellerPassword
                            }
                            errorMessage={
                              form.formState.errors.sellerPassword?.message ||
                              "Senha inválida"
                            }
                          />
                          {isViewPassword ? (
                            <EyeOff
                              className={`absolute right-2 h-5 w-5 transform cursor-pointer ${
                                !!form.formState.errors.sellerPassword
                                  ? "top-1/3 -translate-y-1/2"
                                  : "top-1/2 -translate-y-1/2"
                              }`}
                              onClick={() => setIsViewPassword(false)}
                            />
                          ) : (
                            <Eye
                              className={`absolute right-2 h-5 w-5 transform cursor-pointer ${
                                !!form.formState.errors.sellerPassword
                                  ? "top-1/3 -translate-y-1/2"
                                  : "top-1/2 -translate-y-1/2"
                              }`}
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
                    <FormItem>
                      <FormControl>
                        <SelectLabelInBorder
                          label="Permissão"
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          error={!!form.formState.errors.sellerPermission}
                          errorMessage={
                            form.formState.errors.sellerPermission?.message
                          }
                        >
                          <SelectValue placeholder="Selecione um tipo de permissão" />
                          <SelectContent>
                            {SELLERS_PERMISSIONS_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectLabelInBorder>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sellerStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SelectLabelInBorder
                          label="Status"
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          error={!!form.formState.errors.sellerStatus}
                          errorMessage={
                            form.formState.errors.sellerStatus?.message
                          }
                        >
                          <SelectValue placeholder="Selecione o status do vendedor" />
                          <SelectContent>
                            {SELLERS_STATUS_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectLabelInBorder>
                      </FormControl>
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
