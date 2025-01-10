import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { SidebarProvider, SidebarTrigger } from "./_components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { auth } from "@clerk/nextjs/server";
import { ThemeProvider } from "./_components/theme-provider";
import { ModeToggle } from "./_components/mode-toggle";
import { Toaster } from "./_components/ui/toaster";

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
          <ClerkProvider
            appearance={{
              baseTheme: dark,
            }}
          >
            {!userId ? (
              <div className="flex h-full flex-col overflow-hidden text-base sm:text-lg md:text-sm lg:text-sm">
                {children}
                <Toaster />
              </div>
            ) : (
              <SidebarProvider>
                <AppSidebar />
                <main>
                  <div>
                    <SidebarTrigger />
                  </div>
                  <div className="flex h-full flex-col overflow-hidden text-base sm:text-lg md:text-sm lg:text-sm">
                    {children}
                    <Toaster />
                  </div>
                </main>
              </SidebarProvider>
            )}
            <ModeToggle />
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
