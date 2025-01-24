// "use client";
// import { Services } from "@prisma/client";
// import { ColumnDef } from "@tanstack/react-table";
// // import CategoryTypeBadge from "../_components/category-type-badge";
// // import { DrawerUpsertCategory } from "../_components/drawer-upsert-category";
// // import DeleteCategoryButton from "../_components/delete-category-button";

// export const servicesColumns: ColumnDef<Services>[] = [
//   {
//     accessorKey: "code",
//     header: "Código",
//   },
//   {
//     accessorKey: "name",
//     header: "Nome",
//   },
//   {
//     accessorKey: "value",
//     header: "Valor",
//     cell: ({ row: { original: service } }) => (
//         <span>
//           {new Intl.NumberFormat("pt-BR", {
//             style: "currency",
//             currency: "BRL",
//           }).format(Number(service.value))}
//         </span>
//       ),
//   },
//   {
//     accessorKey: "actions",
//     header: "Ações",
//     cell: ({ row: { original: services } }) => {
//       return (
//         <div className="flex flex-row space-x-1">
//           {/* <DrawerUpsertCategory category={category} isUpdate={true} />
//           <DeleteCategoryButton id={category.id} /> */}
//         </div>
//       );
//     },
//   },
// ];
