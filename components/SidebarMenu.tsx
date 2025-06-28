"use client";
import {
  Avatar,
  Flex,
  Heading,
  Text,
  Menu,
  Portal,
  Icon,
  Separator,
} from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";
import { signOut, useSession } from "next-auth/react";
import { BiSearch } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { toaster, Toaster } from "./ui/toaster";
import { useState } from "react";
export default function Header() {
  const router = useRouter();
  const { data } = useSession();
  const path = usePathname();
  const [menu, setMenu] = useState(false)
  const pages = [
    {
      page: "Dashboard",
      pagePath: "/user/home",
      icon: <RxDashboard />,
    },
    {
      page: "Buscar alertas",
      pagePath: "/user/search",
      icon: <BiSearch />,
    },
  ];
  const handleDisconnect = async () => {
    await signOut({ redirect: true, callbackUrl: "/auth/login" });
  };
  return (
    <Flex
      direction={"column"}
      width={"max"}
      minH={"vh"}
      py={"4"}
      px={"2"}
      gap={"4"}
      borderRightColor={"border"}
      borderRightStyle={"solid"}
      borderRightWidth={"1px"}
      minW={"13.5%"}
    >
      <Toaster />
      <Menu.Root open={menu} onOpenChange={(e) => setMenu(e.open)}>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.ItemGroup>
                <Menu.ItemGroupLabel>Opções</Menu.ItemGroupLabel>
                <Separator />
                <Menu.Item
                  onClick={() => {
                    toaster.create({
                      title: "Área em desenvolvimento",
                      type: "error",
                      duration: 2000,
                    });
                  }}
                  cursor={"pointer"}
                  value="settings"
                >
                  Configurações
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    toaster.create({
                      title: "Área em desenvolvimento",
                      type: "error",
                      duration: 2000,
                    });
                  }}
                  cursor={"pointer"}
                  value="my-alerts"
                >
                  Meus alertas
                </Menu.Item>
                <Menu.Item
                  cursor={"pointer"}
                  value="log-out"
                  color="fg.error"
                  onClick={handleDisconnect}
                  _hover={{ bg: "bg.error", color: "fg.error" }}
                >
                  Desconectar...
                </Menu.Item>
              </Menu.ItemGroup>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
      <Flex
        align={"center"}
        justify={"space-between"}
        style={{ width: "100%" }}
        gap={1}
      >
        <Flex align={"center"} cursor={"pointer"} width={"full"} gap={1} onClick={() => setMenu(!menu)}>
          <Avatar.Root size={"xs"} scale={0.8}>
            <Avatar.Image src={data?.user?.image as string} />
          </Avatar.Root>
          <Heading size={"sm"}>{data?.user?.name}</Heading>
        </Flex>
        <Flex>
          <ColorModeButton size={"xs"} scale={0.8} />
        </Flex>
      </Flex>
      <Flex direction={"column"} gap={2}>
        {pages.map((data, i) => {
          return (
            <Flex
              key={i}
              rounded={3}
              bg={data.pagePath == path ? "gray.muted" : {}}
              padding={2}
              align={"center"}
              cursor={"pointer"}
              gap={2}
              onClick={() => {
                router.push(data.pagePath);
              }}
              _hover={data.pagePath != path ? { bg: "bg.muted" } : { bg: "" }}
            >
              <Icon size={"md"}>{data.icon}</Icon>
              <Text fontWeight={"semibold"} fontSize={"sm"}>
                {data.page}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}
