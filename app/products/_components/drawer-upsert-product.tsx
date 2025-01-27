import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Button } from "@/app/_components/ui/button";
import { InputLabelInBorder } from "@/app/_components/ui/input-label-in-border";
import { MoneyInput } from "@/app/_components/money-input";
import { Loader2Icon, PencilIcon, Plus } from "lucide-react";
import { productUpsert } from "@/app/_data/products/product-upsert";

interface UpsertProductProps {
  product?: {
    id: string;
    code: string;
    name: string;
    value: number;
  };
  isUpdate: boolean;
}

const formSchema = z.object({
  code: z
    .string()
    .min(1, { message: "O código deve ter no mínimo 1 caracteres" }),
  name: z
    .string()
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
  value: z.number().min(0, { message: "O valor deve ser maior que 0" }),
});

export type FormSchemaProductsUpsert = z.infer<typeof formSchema> & {
  id: string | null | undefined;
};

export function DrawerUpsertProducts({
  product,
  isUpdate,
}: UpsertProductProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [productRegisterIsLoading, setProductRegisterIsLoading] =
    useState(false);

  const form = useForm<FormSchemaProductsUpsert>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: product?.id || "",
      code: product?.code || "",
      name: product?.name || "",
      value: product?.value || 0,
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        id: product.id || "",
        code: product.code || "",
        name: product.name || "",
        value: product.value || 0,
      });
    }
  }, [product, form]);

  const onSubmit = async (data: FormSchemaProductsUpsert) => {
    try {
      setProductRegisterIsLoading(true);
      await productUpsert({ ...data, id: product?.id });
      setIsDrawerOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setProductRegisterIsLoading(false);
    }
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger>
        <Button
          size="icon"
          className="text-white"
          onClick={() => setIsDrawerOpen(true)}
        >
          {isUpdate ? <PencilIcon /> : <Plus />}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className="font-bold">
                {isUpdate ? "Editar" : "Cadastrar"} produto
              </DrawerTitle>
              <DrawerDescription>
                {isUpdate
                  ? "Realize as alterações necessárias e salve para editar seu produto"
                  : "Preencha os campos abaixo para cadastrar um novo produto"}
              </DrawerDescription>
            </DrawerHeader>
            <div className="space-y-5 p-4 pb-0">
              <InputLabelInBorder
                label="Código"
                placeholder="Digite o código..."
                error={!!form.formState.errors.code}
                errorMessage={form.formState.errors.code?.message}
                {...form.register("code")}
              />
              <InputLabelInBorder
                label="Nome"
                placeholder="Digite o nome..."
                error={!!form.formState.errors.name}
                errorMessage={form.formState.errors.name?.message}
                {...form.register("name")}
              />
              <MoneyInput
                placeholder="Digite o valor..."
                label="Valor"
                value={form.watch("value")}
                onValueChange={({ floatValue }) =>
                  form.setValue("value", floatValue || 0)
                }
                error={!!form.formState.errors.value}
                errorMessage={form.formState.errors.value?.message}
              />
            </div>
            <DrawerFooter className="flex flex-row justify-between">
              <DrawerClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DrawerClose>
              <Button className="text-white" type="submit">
                {productRegisterIsLoading && (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Salvar
              </Button>
            </DrawerFooter>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
