"use client";

import { AdaptedMultiSelect } from "@/app/_components/ui/adapted-multi-selection";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/app/_components/ui/form";

import { InputLabelInBorder } from "@/app/_components/ui/input-label-in-border";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Textarea } from "@/app/_components/ui/textarea";
import { validateCPF } from "@/app/utils/validate-cpf";
import { zodResolver } from "@hookform/resolvers/zod";
import { Products, Services } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface GenerateBudgetComponentProps {
  products: Products[];
  services: Services[];
}

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
  products: z.array(z.string()),
  services: z.array(z.string()),
  budgetObservation: z.string().optional(),
});

const GenerateBudgetComponent = ({
  products,
  services,
}: GenerateBudgetComponentProps) => {
  const [formData, setFormData] = useState({
    clientDocument: "",
    clientPhone: "",
  });
  const [validateCpf, setValidateCpf] = useState(true);
  const [productsSelected, setProductsSelected] = useState<string[]>([]);
  const [servicesSelected, setServicesSelected] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientDocument: "",
      clientPhone: "",
      products: [],
      services: [],
      budgetObservation: "",
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

  const productsWithValueInNumber = products.map((product) => ({
    ...product,
    value: Number(product.value),
  }));

  const servicesWithValueInNumber = services.map((service) => ({
    ...service,
    value: Number(service.value),
  }));

  const onChangeProducts = (selectedProducts: string[]) => {
    setProductsSelected(selectedProducts);
  };

  const onChangeServices = (selectedServices: string[]) => {
    setServicesSelected(selectedServices);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log(productsSelected);
    console.log(servicesSelected);
  }
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];

  return (
    <div>
      <div className="grid w-full grid-cols-2 justify-between space-x-6">
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
              <FormField
                control={form.control}
                name="products"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AdaptedMultiSelect
                        items={productsWithValueInNumber}
                        variant="product"
                        onValueChange={(selectedProducts) => {
                          field.onChange(selectedProducts);
                          form.clearErrors("products");
                          onChangeProducts(selectedProducts);
                        }}
                        placeholder="Selecione os produtos desejados"
                        label="Produtos"
                        error={!!form.formState.errors.products}
                        errorMessage={form.formState.errors.products?.message}
                        value={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="services"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AdaptedMultiSelect
                        items={servicesWithValueInNumber}
                        variant="service"
                        onValueChange={(selectedServices) => {
                          field.onChange(selectedServices);
                          form.clearErrors("services");
                          onChangeServices(selectedServices);
                        }}
                        placeholder="Selecione os serviços desejados"
                        label="Serviços"
                        error={!!form.formState.errors.services}
                        errorMessage={form.formState.errors.services?.message}
                        value={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budgetObservation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Observações..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
        <div>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default GenerateBudgetComponent;
