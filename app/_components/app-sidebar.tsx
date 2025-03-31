import {
  ChevronRight,
  CircleDollarSignIcon,
  FilePlus2,
  FileSearch,
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
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "./ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { getSellerInfoByEmail } from "../_data/sellers/sellers-info";
import { auth, clerkClient } from "@clerk/nextjs/server";

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

const subItemsBudgets = [
  {
    title: "Meus Orçamentos",
    url: "/budgets/myBudgets",
    icon: FileSearch,
  },
  {
    title: "Novo Orçamento",
    url: "/budgets/newBudgets",
    icon: FilePlus2,
  },
];

export async function AppSidebar() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }
  const user = await (await clerkClient()).users.getUser(userId);

  const userEmail = user.emailAddresses[0].emailAddress;

  const sellerInfoByEmail = await getSellerInfoByEmail(userEmail);

  let sellerPermission =
    sellerInfoByEmail?.verifyIfUserIsSeller?.sellerPermission;
  if (!sellerPermission) {
    sellerPermission = "SELLER";
  }
  // Filter items based on seller permission
  const visibleItems =
    sellerPermission === "SELLER"
      ? items.filter((item) => item.title === "Orçamentos")
      : items;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4 flex items-center justify-center"></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleItems.map((item) =>
                item.title === "Orçamentos" ? (
                  <Collapsible
                    key={item.title}
                    defaultOpen
                    className="group/collapsible"
                  >
                    <SidebarMenuItem key={item.title}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon />
                          <span className="flex text-sm md:text-base lg:text-base">
                            {item.title}
                            <ChevronRight />
                          </span>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {subItemsBudgets.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuButton asChild>
                                <a href={subItem.url}>
                                  <subItem.icon />
                                  <span className="text-sm md:text-base lg:text-base">
                                    {subItem.title}
                                  </span>
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span className="text-sm md:text-base lg:text-base">
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
