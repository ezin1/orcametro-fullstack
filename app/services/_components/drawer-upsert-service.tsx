// import { Button } from "@/app/_components/ui/button";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/app/_components/ui/drawer";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
// } from "@/app/_components/ui/form";
// import { InputLabelInBorder } from "@/app/_components/ui/input-label-in-border";
// import {
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/app/_components/ui/select";
// import { SelectLabelInBorder } from "@/app/_components/ui/select-label-in-border";
// import { categoryUpsert } from "@/app/_data/categories/category-upsert";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Services } from "@prisma/client";
// import { Loader2Icon, PencilIcon, Plus } from "lucide-react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// interface UpsertServiceProps {
//   service?: {
//     id: string;
//     code: string;
//     name: string;
//     value: Services["value"];
//   };
//   isUpdate: boolean;
// }

// const formSchema = z.object({
//   code: z
//     .string()
//     .min(1, { message: "O código deve ter no mínimo 1 caracteres" }),
//   name: z
//     .string()
//     .min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
//   value: z.number().min(0, { message: "O valor deve ser maior que 0" }),

// });

// export type FormSchemaServicesUpsert = z.infer<typeof formSchema> & {
//   id: string | null | undefined;
// };

// export function DrawerUpsertServices({
//   service,
//   isUpdate,
// }: UpsertServiceProps) {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [categoryRegisterIsLoading, setCategoryRegisterIsLoading] =
//     useState(false);

//     const numero: number = 0;
//   const form = useForm<FormSchemaServicesUpsert>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       id: service?.id || "",
//       code: service?.code || "",
//       name: service?.name || "",
//       value: service.value :  ,
//     },
//   });

//   const onSubmit = async (data: FormSchemaServicesUpsert) => {
//     try {
//       setCategoryRegisterIsLoading(true);
//       data = { ...data, id: service?.id };
//       await categoryUpsert(data);
//       setIsDrawerOpen(false);
//       form.reset();
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setCategoryRegisterIsLoading(false);
//     }
//   };

//   return (
//     <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
//       <DrawerTrigger>
//         <Button
//           size="icon"
//           className="text-white"
//           onClick={() => setIsDrawerOpen(true)}
//         >
//           {isUpdate ? <PencilIcon /> : <Plus />}
//         </Button>
//       </DrawerTrigger>
//       <DrawerContent>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             <div className="mx-auto w-full max-w-sm">
//               <DrawerHeader>
//                 <DrawerTitle className="font-bold">
//                   {isUpdate ? "Editar" : "Cadastrar"} serviço
//                 </DrawerTitle>
//                 <DrawerDescription>
//                   {isUpdate
//                     ? "Realize as alterações necessárias e salve para editar sua categoria"
//                     : "Preencha os campos abaixo para cadastrar uma nova categoria"}
//                 </DrawerDescription>
//               </DrawerHeader>
//               <div className="space-y-5 p-4 pb-0">
//                 <FormField
//                   control={form.control}
//                   name="code"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <InputLabelInBorder
//                           label="Código"
//                           placeholder="Digite o código..."
//                           {...field}
//                           error={!!form.formState.errors.code}
//                           errorMessage={form.formState.errors.code?.message}
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <InputLabelInBorder
//                           label="Nome"
//                           placeholder="Digite o nome..."
//                           {...field}
//                           error={!!form.formState.errors.name}
//                           errorMessage={form.formState.errors.name?.message}
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="categoryType"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-row items-center gap-3">
//                       <FormControl>
//                         <SelectLabelInBorder
//                           label="Tipo de categoria"
//                           onValueChange={field.onChange}
//                           defaultValue={field.value}
//                           error={!!form.formState.errors.categoryType}
//                           errorMessage={
//                             form.formState.errors.categoryType?.message
//                           }
//                         >
//                           <SelectValue placeholder="Selecione um tipo de categoria" />
//                           <SelectContent>
//                             {CATEGORIES_TYPES_OPTIONS.map((option) => (
//                               <SelectItem
//                                 key={option.value}
//                                 value={option.value}
//                               >
//                                 {option.label}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </SelectLabelInBorder>
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <DrawerFooter className="flex flex-row justify-between">
//                 <DrawerClose asChild>
//                   <Button variant="outline">Cancelar</Button>
//                 </DrawerClose>
//                 <Button className="text-white" type="submit">
//                   {categoryRegisterIsLoading && (
//                     <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
//                   )}
//                   Salvar
//                 </Button>
//               </DrawerFooter>
//             </div>
//           </form>
//         </Form>
//       </DrawerContent>
//     </Drawer>
//   );
// }
