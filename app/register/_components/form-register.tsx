"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/_components/ui/form";
import { Button } from "@/app/_components/ui/button";
import { DatePicker } from "@/app/_components/ui/date-picker";
import { Switch } from "@/app/_components/ui/switch";

import { validateCNPJ } from "@/app/utils/validate-cnpj";
import { validateCPF } from "@/app/utils/validate-cpf";
import { Loader2Icon } from "lucide-react";

// import { usersRegister } from "@/app/_data/users/users-register";
import { InputLabelInBorder } from "@/app/_components/ui/input-label-in-border";
import { useToast } from "@/app/_hooks/use-toast";

const commonFields = {
  responsibleName: z.string().min(2, {
    message: "Nome do responsável deve conter no mínimo 2 caracteres",
  }),
  responsibleDocument: z.string().min(11, {
    message: "CPF deve conter 11 caracteres",
  }),
  email: z.string().email({
    message: "E-mail inválido",
  }),
  cellphone: z.string().min(11, {
    message: "Celular deve conter 11 caracteres",
  }),
  phone: z.string().min(10, {
    message: "Telefone deve conter 10 caracteres",
  }),
  birthDate: z.date({
    required_error: "Data de nascimento é obrigatória",
  }),
  postalCode: z.string().min(8, {
    message: "CEP deve conter 8 caracteres",
  }),
  streetName: z.string().min(2, {
    message: "Rua deve conter no mínimo 2 caracteres",
  }),
  streetNumber: z.string().min(1, {
    message: "Número deve conter no mínimo 1 caractere",
  }),
  neighborhood: z.string().min(2, {
    message: "Bairro deve conter no mínimo 2 caracteres",
  }),
  city: z.string().min(2, {
    message: "Cidade deve conter no mínimo 2 caracteres",
  }),
  state: z.string().min(2, {
    message: "Estado deve conter no mínimo 2 caracteres",
  }),
};

const companySchema = z.object({
  isCompany: z.literal(true),
  companyName: z.string().min(2, {
    message: "Nome da empresa deve conter no mínimo 2 caracteres",
  }),
  companyDocument: z.string().length(14, {
    message: "CNPJ deve conter 14 caracteres",
  }),
  ...commonFields,
});

const individualSchema = z.object({
  isCompany: z.literal(false),
  companyName: z.string().optional(),
  companyDocument: z.string().optional(),
  ...commonFields,
});

const formSchema = z.union([companySchema, individualSchema]);

export type FormSchemaUserRegister = z.infer<typeof formSchema>;

interface FormRegisterProps {
  userEmail: string;
}

export const FormRegister = ({ userEmail }: FormRegisterProps) => {
  const [formData, setFormData] = useState({
    cellphone: "",
    phone: "",
    responsibleDocument: "",
    companyDocument: "",
    postalCode: "",
  });

  const [validateCpf, setValidateCpf] = useState(true);
  const [validateCnpj, setValidateCnpj] = useState(true);
  const [validateCep, setValidateCep] = useState(true);
  const [registerIsLoading, setRegisterIsLoading] = useState(false);
  const form = useForm<FormSchemaUserRegister>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isCompany: false,
      companyName: "",
      companyDocument: "",
      responsibleName: "",
      responsibleDocument: "",
      email: userEmail,
      cellphone: "",
      phone: "",
      birthDate: new Date(),
      postalCode: "",
      streetName: "",
      streetNumber: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });
  const { toast } = useToast();

  const onChangeFormatNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cellphone") {
      if (value.length === 11) {
        formattedValue = value.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      }
    } else if (name === "phone") {
      if (value.length === 11) {
        formattedValue = value.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      } else if (value.length === 10) {
        formattedValue = value.replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
      }
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const onChangeFormatDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "responsibleDocument") {
      if (value.length === 11) {
        const verifyDocument = validateCPF(value);
        if (!verifyDocument) {
          form.setError("responsibleDocument", {
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
          form.clearErrors("responsibleDocument");
        }
      }
    } else if (name === "companyDocument") {
      if (value.length === 14) {
        const verifyDocument = validateCNPJ(value);

        if (!verifyDocument) {
          form.setError("companyDocument", {
            type: "manual",
            message: "CNPJ inválido",
          });
          setValidateCnpj(false);
        }
        formattedValue = value.replace(
          /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "$1.$2.$3/$4-$5",
        );
        if (verifyDocument) {
          setValidateCnpj(true);
          form.clearErrors("companyDocument");
        }
      }
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const onChangeFormatCep = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "postalCode") {
      if (value.length === 8) {
        formattedValue = value.replace(/^(\d{5})(\d{3})/, "$1-$2");

        const consultViaCep = async () => {
          try {
            const response = await fetch(
              `https://viacep.com.br/ws/${value}/json/`,
            );
            const data = await response.json();

            if (data.erro) {
              form.setError("postalCode", {
                type: "manual",
                message: "CEP inválido",
              });
              setValidateCep(false);
            }

            if (!data.erro) {
              setValidateCep(true);
              form.clearErrors("postalCode");
            }

            form.setValue("streetName", data.logradouro);
            form.setValue("neighborhood", data.bairro);
            form.setValue("city", data.localidade);
            form.setValue("state", data.uf);
          } catch (error) {
            console.error(error);
          }
        };

        consultViaCep();
      }
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const onSubmit = async (data: FormSchemaUserRegister) => {
    try {
      setRegisterIsLoading(true);
      if (data.isCompany) {
        const validateCnpj = validateCNPJ(data.companyDocument);
        const validateCpf = validateCPF(data.responsibleDocument);

        if (!validateCnpj || data.companyDocument === "") {
          form.setError("companyDocument", {
            type: "manual",
            message: "CNPJ inválido",
          });
          setValidateCnpj(false);
        }
        if (!validateCpf || data.responsibleDocument === "") {
          form.setError("responsibleDocument", {
            type: "manual",
            message: "CPF inválido",
          });
          setValidateCpf(false);
        }
      } else {
        const validateCpf = validateCPF(data.responsibleDocument);

        if (!validateCpf || data.responsibleDocument === "") {
          form.setError("responsibleDocument", {
            type: "manual",
            message: "CPF inválido",
          });
          setValidateCpf(false);
        }

        data.companyName = "";
        data.companyDocument = "";
      }

      if (!validateCep) {
        form.setError("postalCode", {
          type: "manual",
          message: "CEP inválido",
        });
        setValidateCep(false);
      }

      // await usersRegister(data);
    } catch (error) {
      console.error(error);
    } finally {
      setRegisterIsLoading(false);
    }
  };

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Preencha todos os campos obrigatórios corretamente.",
      });
    }
  }, [form.formState.errors, toast]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 text-base sm:text-lg md:text-sm lg:text-sm"
      >
        <FormField
          control={form.control}
          name="isCompany"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-center gap-3 text-center">
              <FormLabel>É uma empresa?</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 justify-between lg:grid-cols-2 lg:gap-10">
          <div className="space-y-3 text-start">
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
              name="responsibleName"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3 pt-3">
                  <FormControl>
                    <InputLabelInBorder
                      label="Nome do responsável"
                      {...field}
                      error={!!form.formState.errors.responsibleName}
                      errorMessage={
                        form.formState.errors.responsibleName?.message
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="responsibleDocument"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3 pt-3">
                  <FormControl>
                    <InputLabelInBorder
                      label="CPF do responsável"
                      {...field}
                      value={formData.responsibleDocument}
                      onChange={(e) => {
                        field.onChange(e);
                        onChangeFormatDocument(e);
                      }}
                      accept="number"
                      error={
                        !validateCpf ||
                        !!form.formState.errors.responsibleDocument
                      }
                      errorMessage={
                        form.formState.errors.responsibleDocument?.message ||
                        "CPF inválido"
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cellphone"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3 pt-3">
                  <FormControl>
                    <InputLabelInBorder
                      label="Celular"
                      {...field}
                      value={formData.cellphone}
                      onChange={(e) => {
                        field.onChange(e);
                        onChangeFormatNumber(e);
                      }}
                      error={!!form.formState.errors.cellphone}
                      errorMessage={form.formState.errors.cellphone?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3 pt-3">
                  <FormControl>
                    <InputLabelInBorder
                      label="Telefone"
                      {...field}
                      value={formData.phone}
                      onChange={(e) => {
                        field.onChange(e);
                        onChangeFormatNumber(e);
                      }}
                      error={!!form.formState.errors.phone}
                      errorMessage={form.formState.errors.phone?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3 pt-3">
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    label="Data de Nascimento"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3 pt-3">
                  <FormControl>
                    <InputLabelInBorder
                      label="CEP"
                      {...field}
                      value={formData.postalCode}
                      onChange={(e) => {
                        field.onChange(e);
                        onChangeFormatCep(e);
                      }}
                      error={!validateCep || !!form.formState.errors.postalCode}
                      errorMessage={
                        form.formState.errors.postalCode?.message ||
                        "CEP inválido"
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-3 pt-6 text-start lg:pt-3">
            <FormField
              control={form.control}
              name="streetName"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3">
                  <FormControl>
                    <InputLabelInBorder
                      label="Rua"
                      {...field}
                      error={!!form.formState.errors.streetName}
                      errorMessage={form.formState.errors.streetName?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="streetNumber"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3 pt-3">
                  <FormControl>
                    <InputLabelInBorder
                      label="Número"
                      {...field}
                      error={!!form.formState.errors.streetNumber}
                      errorMessage={form.formState.errors.streetNumber?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3 pt-3">
                  <FormControl>
                    <InputLabelInBorder
                      label="Bairro"
                      {...field}
                      error={!!form.formState.errors.neighborhood}
                      errorMessage={form.formState.errors.neighborhood?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3 pt-3">
                  <FormControl>
                    <InputLabelInBorder
                      label="Cidade"
                      {...field}
                      error={!!form.formState.errors.city}
                      errorMessage={form.formState.errors.city?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3 pt-3">
                  <FormControl>
                    <InputLabelInBorder
                      label="Estado"
                      {...field}
                      error={!!form.formState.errors.state}
                      errorMessage={form.formState.errors.state?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {form.watch("isCompany") && (
              <>
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-3 pt-3">
                      <FormControl>
                        <InputLabelInBorder
                          label="Nome da empresa"
                          {...field}
                          error={!!form.formState.errors.companyName}
                          errorMessage={
                            form.formState.errors.companyName?.message
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                  rules={{ required: form.watch("isCompany") }}
                />
                <FormField
                  control={form.control}
                  name="companyDocument"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-3 pt-3">
                      <FormControl>
                        <InputLabelInBorder
                          label="CNPJ da empresa"
                          {...field}
                          value={formData.companyDocument}
                          onChange={(e) => {
                            field.onChange(e);
                            onChangeFormatDocument(e);
                          }}
                          error={
                            !validateCnpj ||
                            !!form.formState.errors.companyDocument
                          }
                          errorMessage={
                            form.formState.errors.companyDocument?.message ||
                            "CNPJ inválido"
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                  rules={{ required: form.watch("isCompany") }}
                />
              </>
            )}
          </div>
        </div>
        <Button
          type="submit"
          className="font-bold text-white hover:bg-blue-600"
          disabled={registerIsLoading}
        >
          {registerIsLoading && <Loader2Icon className="animate-spin" />}
          Registrar
        </Button>
      </form>
    </Form>
  );
};
