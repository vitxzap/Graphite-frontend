"use client";
import { Flex, Button, Card, Center, Field, Stack, Input, Avatar } from "@chakra-ui/react";
import { BiCloud, BiTv, BiUser, BiError } from "react-icons/bi";
import Header from "../../../components/header";
import CreateCards from "@/components/createCard";
import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
export default function Create() {
	const cardsIconSize = 62;
	const MotionFlex = motion(Flex);
	return (
		<Flex height="vh" maxW="vw" width="vw" direction="column" overflowX="hidden">
			<Header />
			<Flex direction="column" height="100svh" align="center" paddingX="18" paddingY="6" gapY="6">
				<MotionFlex
					gap="3"
					maxW="10/12"
					justifyContent="space-around"
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{
						duration: 0.4,
						scale: { type: "spring", visualDuration: 0.3, bounce: 0.3 },
					}}>
					<CreateCards
						cards={[
							{
								title: "Novo host",
								id: 1,
								icon: <BiTv size={cardsIconSize} />,
								description: "Crie um novo host e o detalhe corretamente para resoluções mais precisas.",
							},
							{
								title: "Novo server",
								id: 2,
								icon: <BiCloud size={cardsIconSize} />,
								description: "Crie um novo server e o detalhe corretamente para resoluções mais precisas.",
							},
							{
								title: "Novo cliente",
								id: 3,
								icon: <BiUser size={cardsIconSize} />,
								description: "Crie um novo cliente e o detalhe corretamente para resoluções mais precisas.",
							},
							{
								title: "Novo problema",
								id: 4,
								icon: <BiError size={cardsIconSize} />,
								description: "Detalhe um problema para que sua resolução seja cada vez mais rápida e otimizada.",
							},
						]}
					/>
				</MotionFlex>
				<MotionFlex
					maxW="83.3333%"
					gap="2"
					flexWrap="wrap"
					justifyContent="space-between"
					width="83.3333%"
					border="gray"
					borderStyle="solid"
					borderWidth="thin"
					borderColor="#E4E4E7"
					borderRadius="sm"
					padding="6">
					{}
				</MotionFlex>
			</Flex>
		</Flex>
	);
}
