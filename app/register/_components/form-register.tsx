"use client";

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
import { Input } from "@/app/_components/ui/input";
import { DatePicker } from "@/app/_components/ui/date-picker";
import { Switch } from "@/app/_components/ui/switch";

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

type FormSchema = z.infer<typeof formSchema>;

interface FormRegisterProps {
  userEmail: string;
}
export const FormRegister = ({ userEmail }: FormRegisterProps) => {
  const form = useForm<FormSchema>({
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

  const onSubmit = async (data: FormSchema) => {
    try {
      console.log(data);
      if (data.isCompany && (!data.companyDocument || !data.companyName)) {
        alert("Nome da empresa e CNPJ são obrigatórios");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

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
            <FormItem className="flex flex-col items-center gap-3">
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

        <div className="grid grid-cols-1 justify-between gap-6 sm:overflow-y-auto lg:grid-cols-2">
          <div className="text-start">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="h-full w-full"
                      placeholder="teste@gmail.com"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsibleName"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3">
                  <FormLabel>Nome do responsável</FormLabel>
                  <FormControl>
                    <Input className="h-full w-full" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="responsibleDocument"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3">
                  <FormLabel>CPF do responsável</FormLabel>
                  <FormControl>
                    <Input className="h-full w-full" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cellphone"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3">
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input className="h-full w-full" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3">
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input className="h-full w-full" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3">
                  <FormLabel>Data de nascimento</FormLabel>
                  <DatePicker value={field.value} onChange={field.onChange} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3">
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="text-start">
            <FormField
              control={form.control}
              name="streetName"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3">
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input className="h-full w-full" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="streetNumber"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3">
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input className="h-full w-full" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3">
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input className="h-full w-full" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3">
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input className="h-full w-full" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3">
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input className="h-full w-full" {...field} />
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
                    <FormItem className="flex flex-row items-center gap-3">
                      <FormLabel>Nome da empresa</FormLabel>
                      <FormControl>
                        <Input className="h-full w-full" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                  rules={{ required: form.watch("isCompany") }}
                />
                <FormField
                  control={form.control}
                  name="companyDocument"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-3">
                      <FormLabel>CNPJ da empresa</FormLabel>
                      <FormControl>
                        <Input className="h-full w-full" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                  rules={{ required: form.watch("isCompany") }}
                />
              </>
            )}
          </div>
        </div>
        <Button type="submit">Registrar</Button>
      </form>
    </Form>
  );
};
