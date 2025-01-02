// "use client";
// import { Categories } from "@prisma/client";
// import { ColumnDef } from "@tanstack/react-table";
// import CategoryTypeBadge from "../_components/category-type-badge";
// import DropdownListActions from "../_components/dropdown-list-actions";

// export const categoriesColumns: ColumnDef<Categories>[] = [
//   {
//     accessorKey: "categoryType",
//     header: "Tipo de categoria",
//     cell: ({ row: { original: category } }) => (
//       <CategoryTypeBadge category={category} />
//     ),
//   },
//   {
//     accessorKey: "code",
//     header: "Código",
//   },
//   {
//     accessorKey: "name",
//     header: "Nome",
//   },
//   {
//     accessorKey: "actions",
//     header: "Ações",
//     cell: ({ row: { original: category } }) => {
//       return (
//         <div className="flex flex-row space-x-1">
//           <DropdownListActions category={category}/>
//         </div>
//       );
//     },
//   },
// ];
