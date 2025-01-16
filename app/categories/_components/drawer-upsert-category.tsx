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
import { InputLabelInBorder } from "@/app/_components/ui/input-label-in-border";
import {
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/app/_components/ui/select";
import { SelectLabelInBorder } from "@/app/_components/ui/select-label-in-border";
import { CATEGORIES_TYPES_OPTIONS } from "@/app/_constants/categories";
import { categoryUpsert } from "@/app/_data/categories/category-upsert";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryType } from "@prisma/client";
import { ClipboardPlus, Loader2Icon, PencilIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UpsertCategoryProps {
  category?: {
    id: string;
    code: string;
    name: string;
    categoryType: CategoryType;
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
  categoryType: z.nativeEnum(CategoryType, {
    required_error: "Selecione um tipo de categoria",
  }),
});

export type FormSchemaCategoryUpsert = z.infer<typeof formSchema> & {
  id: string | null | undefined;
};

export function DrawerUpsertCategory({
  category,
  isUpdate,
}: UpsertCategoryProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [categoryRegisterIsLoading, setCategoryRegisterIsLoading] =
    useState(false);
  const form = useForm<FormSchemaCategoryUpsert>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: category?.id || "",
      code: category?.code || "",
      name: category?.name || "",
      categoryType: category?.categoryType || "PRODUCT",
    },
  });

  const onSubmit = async (data: FormSchemaCategoryUpsert) => {
    try {
      setCategoryRegisterIsLoading(true);
      data = { ...data, id: category?.id };
      await categoryUpsert(data);
      setIsDrawerOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setCategoryRegisterIsLoading(false);
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
          {isUpdate ? <PencilIcon /> : <ClipboardPlus />}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle className="font-bold">
                  {isUpdate ? "Editar" : "Cadastrar"} categoria
                </DrawerTitle>
                <DrawerDescription>
                  {isUpdate
                    ? "Realize as alterações necessárias e salve para editar sua categoria"
                    : "Preencha os campos abaixo para cadastrar uma nova categoria"}
                </DrawerDescription>
              </DrawerHeader>
              <div className="space-y-5 p-4 pb-0">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputLabelInBorder
                          label="Código"
                          placeholder="Digite o código..."
                          {...field}
                          error={!!form.formState.errors.code}
                          errorMessage={form.formState.errors.code?.message}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
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
                  name="categoryType"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-3">
                      <FormControl>
                        <SelectLabelInBorder
                          label="Tipo de categoria"
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          error={!!form.formState.errors.categoryType}
                          errorMessage={
                            form.formState.errors.categoryType?.message
                          }
                        >
                          <SelectValue placeholder="Selecione um tipo de categoria" />
                          <SelectContent>
                            {CATEGORIES_TYPES_OPTIONS.map((option) => (
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
                  {categoryRegisterIsLoading && (
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
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
