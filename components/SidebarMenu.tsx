"use client";
import {
  Avatar,
  Flex,
  Heading,
  Text,
  Menu,
  Portal,
  Button,
  Drawer,
  CloseButton,
  Icon,
  ClientOnly,
  Skeleton,
  Separator,
} from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";
import { signOut, useSession } from "next-auth/react";
import { LuActivity, LuAlarmClock, LuBadge } from "react-icons/lu";
import { BiHome, BiSolidDashboard } from "react-icons/bi";
export default function Header() {
  const { status, data } = useSession();
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
	  gap={4}
      border="1px solid red"
      minW={"13.5%"}
    >
      <Flex align={"center"} justify={"space-between"} style={{ width: "100%" }} gap={1}>
        <Flex align={"center"} justify={"center"} gap={1}>
          <Avatar.Root size={"xs"} scale={0.8}>
            <Avatar.Image src={data?.user?.image as string} />
          </Avatar.Root>
          <Heading size={"sm"}>{data?.user?.name}</Heading>
        </Flex>
		<Flex>
			<ColorModeButton size={"xs"} scale={0.8}/>
		</Flex>
      </Flex>
      <Flex direction={"column"} gap={2}>
		{Array.from({length: 2}).map((_, i) => {
			return (
				<Flex rounded={3} padding={2} align={"center"} cursor={"pointer"} _hover={{bg: "bg.muted"}} gap={2}>
					<Icon size={"md"}>
						<BiSolidDashboard />
					</Icon>
					<Text fontWeight={"semibold"} fontSize={"sm"}>Home {i}</Text>
				</Flex>
			)
		})}
	  </Flex>
    </Flex>
  );
}
