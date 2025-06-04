import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
import { Theme } from "@chakra-ui/react";
import { Roboto, Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Project v1.0",
  description: "By vitozap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <Provider><Theme appearance="light">{children}</Theme></Provider>
      </body>
    </html>
  );
}
