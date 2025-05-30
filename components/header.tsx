"use client";
import { Flex, SegmentGroup, SegmentGroupItemText, useSteps } from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
	const path = usePathname();
	const router = useRouter();
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
		<Flex w="vw" padding="2" h="max-content" bg="#FAFAFA" borderBottomColor="#E4E4E7" borderBottomWidth="1px" justifyContent="space-between" alignItems="center">
			Project v1.0
			<SegmentGroup.Root value={page}>
				<SegmentGroup.Indicator bg="#fff" />
				{item.map((option) => {
					return (
						<SegmentGroup.Item
							value={option.title}
							key={option.route}
							cursor="pointer"
							onClick={() => {
                                setPage(option.title);
                                router.push(option.route)
							}}>
							<SegmentGroup.ItemText>{option.title}</SegmentGroup.ItemText>
						</SegmentGroup.Item>
					);
				})}
			</SegmentGroup.Root>
		</Flex>
	);
}
