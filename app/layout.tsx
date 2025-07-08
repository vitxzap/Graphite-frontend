"use client";
import Provider from "./provider";
import { Flex, Theme } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import AuthProvider from "./lib/auth/provider/provider";
import Header from "@/components/SidebarMenu";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, []);
  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body style={{ margin: 0, boxSizing: "border-box" }}>
        <AuthProvider>
          <Provider>
            <Flex >
              {path != "/auth/login" ? <Header /> : undefined}
              {children}
            </Flex>
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
