"use client"
import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import { defaultSystem } from "@chakra-ui/react"

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
        {props.children}
      </ThemeProvider>
    </ChakraProvider>
  )
}