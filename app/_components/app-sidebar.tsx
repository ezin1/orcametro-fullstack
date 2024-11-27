import {
  CircleDollarSignIcon,
  ClipboardList,
  FileSpreadsheet,
  Home,
  Package,
  Users,
  Wrench,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Orçamentos",
    url: "/budgets",
    icon: FileSpreadsheet,
  },
  {
    title: "Produtos",
    url: "/products",
    icon: Package,
  },
  {
    title: "Serviços",
    url: "/services",
    icon: Wrench,
  },
  {
    title: "Categorias",
    url: "/categories",
    icon: ClipboardList,
  },
  {
    title: "Vendedores",
    url: "/sellers",
    icon: Users,
  },
  {
    title: "Assinaturas",
    url: "/subscriptions",
    icon: CircleDollarSignIcon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4 flex justify-center">
            <Image
              src="/logo.png"
              width={187}
              height={49}
              alt="Orçametro"
              className="mt-3"
            />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
