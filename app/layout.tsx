import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { SidebarProvider, SidebarTrigger } from "./_components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { auth } from "@clerk/nextjs/server";

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
      <body className={`${mulish.className} dark antialiased`}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          {!userId ? (
            <div className="flex h-full flex-col overflow-hidden">
              {children}
            </div>
          ) : (
            <SidebarProvider>
              <AppSidebar />
              <main>
                <div>
                  <SidebarTrigger />
                </div>
                <div className="flex h-full flex-col overflow-hidden">
                  {children}
                </div>
              </main>
            </SidebarProvider>
          )}
        </ClerkProvider>
      </body>
    </html>
  );
}
