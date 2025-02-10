"use client";

import { AdaptedMultiSelect } from "@/app/_components/ui/adapted-multi-selection";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";

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

interface ProductsFull extends Products {
  valueTotal: number;
  quantity: number;
}

interface ServicesFull extends Services {
  valueTotal: number;
  quantity: number;
}

const GenerateBudgetComponent = ({
  products,
  services,
}: GenerateBudgetComponentProps) => {
  const [formData, setFormData] = useState({
    clientDocument: "",
    clientPhone: "",
  });

  const [validateCpf, setValidateCpf] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<ProductsFull[]>([]);
  const [servicesSelected, setServicesSelected] = useState<ServicesFull[]>([]);
  const [budgetTotal, setBudgetTotal] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);

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
        acc.push({
          ...product,
          value: product.value as unknown as Decimal,
          quantity: 1,
          valueTotal: Number(product.value),
        });
      }
      return acc;
    }, [] as ProductsFull[]);

    setSelectedProducts(updatedSelectedProducts);
  };

  const onChangeServices = (selectedServices: string[]) => {
    const updatedSelectedServices = selectedServices.reduce((acc, id) => {
      const service = servicesWithValueInNumber.find((s) => s.id === id);
      if (service && !acc.some((s) => s.id === id)) {
        acc.push({
          ...service,
          value: service.value as unknown as Decimal,
          quantity: 1,
          valueTotal: Number(service.value),
        });
      }
      return acc;
    }, [] as ServicesFull[]);

    setServicesSelected(updatedSelectedServices);
  };

  const onChangeTakeValueTotalProduct = (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: string,
  ) => {
    const { value } = e.target;

    if (Number(value) === 0 || value === "") {
      e.target.value = "1";
      return;
    }

    const updatedSelectedProducts = selectedProducts.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          value: product.value as unknown as Decimal,
          quantity: Number(value),
          valueTotal: Number(product.value) * Number(value),
        };
      }
      return product;
    });

    setSelectedProducts(updatedSelectedProducts);
  };

  const onChangeTakeValueTotalService = (
    e: React.ChangeEvent<HTMLInputElement>,
    serviceId: string,
  ) => {
    const { value } = e.target;

    if (Number(value) === 0 || value === "") {
      e.target.value = "1";
      return;
    }

    const updatedSelectedServices = servicesSelected.map((service) => {
      if (service.id === serviceId) {
        return {
          ...service,
          value: service.value as unknown as Decimal,
          quantity: Number(value),
          valueTotal: Number(service.value) * Number(value),
        };
      }
      return service;
    });

    setServicesSelected(updatedSelectedServices);
  };

  const onChangeSetDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value === 0) {
      setBudgetTotal(
        selectedProducts.reduce(
          (acc, product) => acc + Number(product.valueTotal),
          0,
        ) +
          servicesSelected.reduce(
            (acc, service) => acc + Number(service.valueTotal),
            0,
          ),
      );
      setDiscountPercentage(0);

      e.target.value = "0";
      return;
    }

    if (value > 100) {
      e.target.value = "100";
      return;
    }

    const budgetTotal =
      selectedProducts.reduce(
        (acc, product) => acc + Number(product.valueTotal),
        0,
      ) +
      servicesSelected.reduce(
        (acc, service) => acc + Number(service.valueTotal),
        0,
      );

    setDiscountPercentage(value);

    const valueWhitDiscount = (value / 100) * budgetTotal;

    setBudgetTotal(budgetTotal - valueWhitDiscount);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    console.log(budgetTotal);
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
                  <TableCell className="text-right">
                    <Input
                      accept="number"
                      className="[&::-moz-appearance:textfield] appearance-none text-right [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      type="number"
                      defaultValue={product.quantity}
                      onChange={(e) =>
                        onChangeTakeValueTotalProduct(e, product.id)
                      }
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(product.valueTotal))}
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
                  <TableCell className="text-right">
                    <Input
                      accept="number"
                      className="[&::-moz-appearance:textfield] appearance-none text-right [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      type="number"
                      defaultValue={service.quantity}
                      onChange={(e) =>
                        onChangeTakeValueTotalService(e, service.id)
                      }
                    />
                  </TableCell>
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
                <TableCell colSpan={4}>Desconto %</TableCell>
                <TableCell className="text-right">
                  <Input
                    accept="number"
                    className="[&::-moz-appearance:textfield] appearance-none text-right [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    type="number"
                    onChange={(e) => onChangeSetDiscount(e)}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}>Subtotal</TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(
                    selectedProducts.reduce(
                      (acc, product) => acc + Number(product.valueTotal),
                      0,
                    ) +
                      servicesSelected.reduce(
                        (acc, service) => acc + Number(service.valueTotal),
                        0,
                      ),
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(
                    selectedProducts.reduce(
                      (acc, product) => acc + Number(product.valueTotal),
                      0,
                    ) +
                      servicesSelected.reduce(
                        (acc, service) => acc + Number(service.valueTotal),
                        0,
                      ) -
                      (discountPercentage / 100) *
                        (selectedProducts.reduce(
                          (acc, product) => acc + Number(product.valueTotal),
                          0,
                        ) +
                          servicesSelected.reduce(
                            (acc, service) => acc + Number(service.valueTotal),
                            0,
                          )),
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default GenerateBudgetComponent;
