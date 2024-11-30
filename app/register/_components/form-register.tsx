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
  FormMessage,
} from "@/app/_components/ui/form";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { DatePicker } from "@/app/_components/ui/date-picker";
import { Switch } from "@/app/_components/ui/switch";

const formSchema = z.object({
  isCompany: z.boolean(),
  companyName: z
    .string({
      required_error: "Nome da empresa é obrigatório",
    })
    .min(2, {
      message: "O nome da empresa deve conter no mínimo 2 caracteres",
    }),
  companyDocument: z
    .string({
      required_error: "CNPJ é obrigatório",
    })
    .min(14, {
      message: "CNPJ deve conter 14 caracteres",
    }),
  responsibleName: z
    .string({
      required_error: "Nome do responsável é obrigatório",
    })
    .min(2, {
      message: "Nome do responsável deve conter no mínimo 2 caracteres",
    }),
  responsibleDocument: z
    .string({
      required_error: "CPF é obrigatório",
    })
    .min(11, {
      message: "CPF deve conter 11 caracteres",
    }),
  email: z
    .string({
      required_error: "E-mail é obrigatório",
    })
    .email({
      message: "E-mail inválido",
    }),
  cellphone: z
    .string({
      required_error: "Celular é obrigatório",
    })
    .min(11, {
      message: "Celular deve conter 11 caracteres",
    }),
  phone: z
    .string({
      required_error: "Telefone é obrigatório",
    })
    .min(10, {
      message: "Telefone deve conter 10 caracteres",
    }),
  birthDate: z.date({
    required_error: "Data de nascimento é obrigatório",
  }),
  postalCode: z
    .string({
      required_error: "CEP é obrigatório",
    })
    .min(8, {
      message: "CEP deve conter 8 caracteres",
    }),
  streetName: z
    .string({
      required_error: "Rua é obrigatório",
    })
    .min(2, {
      message: "Rua deve conter no mínimo 2 caracteres",
    }),
  streetNumber: z
    .string({
      required_error: "Número é obrigatório",
    })
    .min(1, {
      message: "Número deve conter no mínimo 1 caractere",
    }),
  neighborhood: z
    .string({
      required_error: "Bairro é obrigatório",
    })
    .min(2, {
      message: "Bairro deve conter no mínimo 2 caracteres",
    }),
  city: z
    .string({
      required_error: "Cidade é obrigatório",
    })
    .min(2, {
      message: "Cidade deve conter no mínimo 2 caracteres",
    }),
  state: z
    .string({
      required_error: "Estado é obrigatório",
    })
    .min(2, {
      message: "Estado deve conter no mínimo 2 caracteres",
    }),
});

interface FormRegisterProps {
  userEmail: string;
}
export const FormRegister = ({ userEmail }: FormRegisterProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 justify-between lg:grid-cols-2">
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="teste@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsibleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do responsável</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="responsibleDocument"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF do responsável</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cellphone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de nascimento</FormLabel>
                  <DatePicker value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="streetName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="streetNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("isCompany") && (
              <>
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da empresa</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyDocument"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CNPJ da empresa</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
