// "use client"

// import { Button } from "@/app/_components/ui/button";
// import { Form, FormControl, FormField, FormItem } from "@/app/_components/ui/form";

// import { InputLabelInBorder } from "@/app/_components/ui/input-label-in-border";
// import { Separator } from "@/app/_components/ui/separator";
// import { zodResolver } from "@hookform/resolvers/zod";
// // import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// const formSchema = z.object({
//     clientName: z.string().min(2, {
//       message: "Username must be at least 2 characters.",
//     }),
//   })

// const GenerateBudgetComponent = () => {

//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//           clientName: "",
//         },
//       })

//       function onSubmit(values: z.infer<typeof formSchema>) {
//         // Do something with the form values.
//         // ✅ This will be type-safe and validated.
//         console.log(values)
//       }

//     return (
//         <div>
//             <div className="grid grid-cols-3 w-full space-x-6 justify-between">
//                 <div>
//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                             <FormField
//                                 // control={form.control}
//                                 clientName="clientName"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormControl>
//                                             <InputLabelInBorder
//                                             label="Nome do Cliente"
//                                             placeholder="Digite o nome..."
//                                             {...field}
//                                             error={!!form.formState.errors.clientName}
//                                             errorMessage={form.formState.errors.clientName?.message}
//                                             />
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                             />
//                             <Button type="submit">Submit</Button>
//                         </form>
//                     </Form>
//                 </div>
//                 <Separator className="flex items-center justify-center" orientation="vertical"/>
//                 <div>
//                 <h3>TESTE</h3> <h3>TESTE</h3> <h3>TESTE</h3>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default GenerateBudgetComponent;
