import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { SidebarProvider, SidebarTrigger } from "./_components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { ThemeProvider } from "./_components/theme-provider";
import { ModeToggle } from "./_components/mode-toggle";
import { Toaster } from "./_components/ui/toaster";
import { getSellerInfoByEmail } from "./_data/sellers/sellers-info";
import { redirect } from "next/navigation";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Orçametro",
  description: "Orçametro",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const user = await (await clerkClient()).users.getUser(userId);
  const userEmail = user.emailAddresses[0].emailAddress;

  const sellerInfoByEmail = await getSellerInfoByEmail(userEmail);
  const defaultSellerPermission = "SELLER";
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${mulish.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            {!userId ? (
              <div className="flex h-full w-full flex-col overflow-hidden text-base sm:text-lg md:text-sm lg:text-sm">
                {children}
                <Toaster />
              </div>
            ) : (
              <div className="flex">
                <SidebarProvider className="flex">
                  <AppSidebar
                    sellerPermission={
                      sellerInfoByEmail.verifyIfUserIsSeller
                        ?.sellerPermission ?? defaultSellerPermission
                    }
                  />
                  <main>
                    <div>
                      <SidebarTrigger />
                    </div>
                    <div className="flex h-full w-full flex-col overflow-hidden text-base sm:text-lg md:text-sm lg:text-sm">
                      {children}
                      <Toaster />
                    </div>
                  </main>
                </SidebarProvider>
              </div>
            )}
            <ModeToggle />
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
