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
import type { Products, Services } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { useState } from "react"; // Added ReactElement import
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
  const [selectedProducts, setSelectedProducts] = useState<Products[]>([]);
  const [servicesSelected, setServicesSelected] = useState<Services[]>([]);

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

  const onChangeProducts = (selectedProductIds: string[]) => {
    const updatedSelectedProducts = selectedProductIds.reduce((acc, id) => {
      const product = productsWithValueInNumber.find((p) => p.id === id);
      if (product && !acc.some((p) => p.id === id)) {
        acc.push({ ...product, value: product.value as unknown as Decimal });
      }
      return acc;
    }, [] as Products[]);

    setSelectedProducts(updatedSelectedProducts);
  };

  const onChangeServices = (selectedServices: string[]) => {
    const updatedSelectedServices = selectedServices.reduce((acc, id) => {
      const service = servicesWithValueInNumber.find((s) => s.id === id);
      if (service && !acc.some((s) => s.id === id)) {
        acc.push({ ...service, value: service.value as unknown as Decimal });
      }
      return acc;
    }, [] as Services[]);

    setServicesSelected(updatedSelectedServices);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log(selectedProducts);

    console.log(servicesSelected);
  }

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
                        onValueChange={(selectedProductIds) => {
                          field.onChange(selectedProductIds);
                          form.clearErrors("products");
                          onChangeProducts(selectedProductIds);
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
            <TableCaption>Simulação de valores do orçamento</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="text-right">Valor (UN)</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.code}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(product.value))}
                  </TableCell>
                  <TableCell className="text-right">1</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(product.value))}
                  </TableCell>
                </TableRow>
              ))}
              {servicesSelected.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.code}</TableCell>
                  <TableCell>{service.name}</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(service.value))}
                  </TableCell>
                  <TableCell className="text-right">1</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(service.value))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Desconto</TableCell>
                <TableCell className="text-right">10%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}>Subtotal</TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(
                    selectedProducts.reduce(
                      (acc, product) => acc + Number(product.value),
                      0,
                    ) +
                      servicesSelected.reduce(
                        (acc, service) => acc + Number(service.value),
                        0,
                      ),
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-right">Valor com desconto</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default GenerateBudgetComponent;
