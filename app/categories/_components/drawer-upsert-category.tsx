import { AlertDestructive } from "@/app/_components/alert-dialog";
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
  FormLabel,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { CATEGORIES_TYPES_OPTIONS } from "@/app/_constants/categories";
import { categoryUpsert } from "@/app/_data/categories/category-upsert";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryType } from "@prisma/client";
import { ClipboardPlus, Loader2Icon, PencilIcon } from "lucide-react";
import { useState, useEffect } from "react";
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
    .min(3, { message: "O código deve ter no mínimo 3 caracteres" }),
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
  const [showAlert, setShowAlert] = useState(false);
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

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [form.formState.errors]);

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
              {showAlert && <AlertDestructive />}
              <div className="space-y-2 p-4 pb-0">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-3">
                      <FormLabel className="text-sm font-bold">
                        Código
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o código..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-3">
                      <FormLabel className="text-sm font-bold">Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o nome..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryType"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-3">
                      <FormLabel className="text-sm font-bold">
                        Tipo de categoria
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um tipo de categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORIES_TYPES_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
