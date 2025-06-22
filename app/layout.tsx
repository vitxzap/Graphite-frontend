
import Provider from "./provider"
import { Theme } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import AuthProvider from "./lib/auth/provider/provider";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body>
        <AuthProvider>
          <Provider>{children}</Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
