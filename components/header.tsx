"use client";
import { Avatar, Flex, Heading, Text, Menu, Portal, Button, Drawer, CloseButton, Icon, ClientOnly, Skeleton } from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";
import { signOut, useSession } from "next-auth/react";
import { FaBolt } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
export default function Header() {
	const { status, data } = useSession();
	const handleDisconnect = async () => {
		await signOut({ redirect: true, callbackUrl: "/auth/login" });
	};
	return (
		<Flex
			style={{ width: "100%", maxWidth: "100%" }}
			padding="2"
			bg={{ base: "#FAFAFA", _dark: "#0F0F13" }}
			borderBottomColor={{ base: "#E4E4E7", _dark: "#323232" }}
			borderBottomWidth="1px"
			justifyContent="space-between"
			alignItems="center">
			<ClientOnly fallback={<Skeleton width={"full"} padding={6} variant={"shine"}  />}>
				<Flex>
					<Drawer.Root placement={"start"}>
						<Drawer.Trigger asChild>
							<Button variant="ghost" padding={1}>
								<GiHamburgerMenu />
							</Button>
						</Drawer.Trigger>
						<Portal>
							<Drawer.Backdrop />
							<Drawer.Positioner>
								<Drawer.Content>
									<Drawer.Header>
										<Drawer.Title>Navegar</Drawer.Title>
									</Drawer.Header>
									<Drawer.Body>
										<Flex direction={"column"}>
											{Array.from({ length: 4 }).map((_, i) => {
												return (
													<Flex padding={3} align={"center"} gap={2} _hover={{ bg: "bg.emphasized", rounded: "md" }} cursor={"pointer"}>
														<Icon size={"sm"}>
															<FaBolt />
														</Icon>
														<Text textStyle={"md"}>Option {i}</Text>
													</Flex>
												);
											})}
										</Flex>
									</Drawer.Body>
									<Drawer.CloseTrigger asChild>
										<CloseButton size="sm" />
									</Drawer.CloseTrigger>
								</Drawer.Content>
							</Drawer.Positioner>
						</Portal>
					</Drawer.Root>
				</Flex>
				<Flex gap={3} align={"center"} maxW={"full"}>
					<ColorModeButton />
					{data?.user && (
						<Menu.Root>
							<Menu.Trigger asChild>
								<Button variant={"ghost"} colorPalette={"black"} padding={1}>
									<Flex align={"center"} gap={1}>
										<Avatar.Root size={"xs"} scale={0.75}>
											<Avatar.Image src={data.user.image as string} />
										</Avatar.Root>
									</Flex>
								</Button>
							</Menu.Trigger>
							<Portal>
								<Menu.Positioner>
									<Menu.Content>
										<Menu.ItemGroup>
											<Menu.ItemGroupLabel>{data.user.name}</Menu.ItemGroupLabel>
											<Menu.Separator />
											<Menu.Item cursor={"pointer"} value="disconnect" color="fg.error" _hover={{ bg: "bg.error", color: "fg.error" }} onClick={handleDisconnect}>
												Desconectar
											</Menu.Item>
										</Menu.ItemGroup>
									</Menu.Content>
								</Menu.Positioner>
							</Portal>
						</Menu.Root>
					)}
				</Flex>
			</ClientOnly>
		</Flex>
	);
}
