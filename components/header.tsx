"use client";
import { Flex, SegmentGroup, Button } from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ColorModeButton } from "./ui/color-mode";
import { signOut } from "next-auth/react";
export default function Header() {
	const path = usePathname();
	const router = useRouter();
	const logOut = async () => {
		await signOut({
			redirect: true,
			callbackUrl: "/auth/login"
		});
	}
	const [page, setPage] = useState<any>("");
	const item = [
		{
			title: "Home",
			route: "/user/home",
		},
		{
			title: "Buscar",
			route: "/user/search",
		},
		{
			title: "Adicionar",
			route: "/user/create",
		},
	];

	useEffect(() => {
		item.map((opt) => {
			if (opt.route == path) {
				setPage(opt.title);
			}
		});
	}, []);

	return (
		<Flex
			style={{width: "100%", maxWidth: "100%"}}
			padding="2"
			bg={{ base: "#FAFAFA", _dark: "#09090b" }}
			borderBottomColor={{ base: "#E4E4E7", _dark: "#323232" }}
			borderBottomWidth="1px"
			justifyContent="space-between"
			alignItems="center">
			Project v1.0
			
			<Flex gap={3} align={"center"} >
				<ColorModeButton />
				<Button onClick={logOut} variant={"subtle"}>Sign Out</Button>
				<SegmentGroup.Root value={page}>
					<SegmentGroup.Indicator />
					{item.map((option) => {
						return (
							<SegmentGroup.Item
								value={option.title}
								key={option.route}
								cursor="pointer"
								onClick={() => {
									setPage(option.title);
									setTimeout(() => {
										router.push(option.route);
									}, 200);
								}}>
								<SegmentGroup.ItemText>{option.title}</SegmentGroup.ItemText>
							</SegmentGroup.Item>
						);
					})}
				</SegmentGroup.Root>
			</Flex>
		</Flex>
	);
}
