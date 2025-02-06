"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/app/_components/ui/form";

import { InputLabelInBorder } from "@/app/_components/ui/input-label-in-border";
import { Separator } from "@/app/_components/ui/separator";
import { validateCPF } from "@/app/utils/validate-cpf";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
// import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  clientName: z.string().min(3, {
    message: "Nome deve conter no mínimo 3 caracteres",
  }),
  clientEmail: z.string().email({ message: "Email inválido" }),
  clientDocument: z.string().min(11, {
    message: "CPF deve conter 11 caracteres",
  }),
  clientPhone: z.string().min(11, {
    message: "Telefone deve conter 11 caracteres",
  }),
});

const GenerateBudgetComponent = () => {
  const [formData, setFormData] = useState({
    clientDocument: "",
    clientPhone: "",
  });
  const [validateCpf, setValidateCpf] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientDocument: "",
      clientPhone: "",
    },
  });

  const onChangeFormatDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (value.length === 11) {
      const verifyDocument = validateCPF(value);
      if (!verifyDocument) {
        form.setError("clientDocument", {
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
        form.clearErrors("clientDocument");
      }
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const onChangeFormatNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "clientPhone") {
      if (value.length === 11) {
        formattedValue = value.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      }
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div>
      <div className="grid w-full grid-cols-3 justify-between space-x-6">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputLabelInBorder
                          label="Nome do Cliente"
                          placeholder="Digite o nome..."
                          {...field}
                          error={!!form.formState.errors.clientName}
                          errorMessage={
                            form.formState.errors.clientName?.message
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientDocument"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center">
                      <FormControl>
                        <InputLabelInBorder
                          label="CPF do responsável"
                          {...field}
                          value={formData.clientDocument}
                          onChange={(e) => {
                            field.onChange(e);
                            onChangeFormatDocument(e);
                          }}
                          accept="number"
                          error={
                            !validateCpf ||
                            !!form.formState.errors.clientDocument
                          }
                          errorMessage={
                            form.formState.errors.clientDocument?.message ||
                            "CPF inválido"
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="clientEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputLabelInBorder
                          label="Email do cliente"
                          placeholder="Digite o email..."
                          {...field}
                          error={!!form.formState.errors.clientEmail}
                          errorMessage={
                            form.formState.errors.clientEmail?.message
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientPhone"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center">
                      <FormControl>
                        <InputLabelInBorder
                          label="Celular"
                          {...field}
                          value={formData.clientPhone}
                          onChange={(e) => {
                            field.onChange(e);
                            onChangeFormatNumber(e);
                          }}
                          error={!!form.formState.errors.clientPhone}
                          errorMessage={
                            form.formState.errors.clientPhone?.message
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
        <Separator
          className="flex items-center justify-center"
          orientation="vertical"
        />
        <div>
          <h3>TESTE</h3> <h3>TESTE</h3> <h3>TESTE</h3>
        </div>
      </div>
    </div>
  );
};

export default GenerateBudgetComponent;
