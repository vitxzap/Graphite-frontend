"use client";
import { Flex, Button, Card, Center, Field, Stack, Input, Avatar, useSteps } from "@chakra-ui/react";
import { BiCloud, BiTv, BiUser, BiError } from "react-icons/bi";
import Header from "../../../components/header";
import { CreateCards } from "@/components/createCard";
import { motion } from "motion/react";
import { createContext, useMemo, useState, memo, useContext, useEffect } from "react";
import storage from "local-storage"
export const DataContext = createContext<any>(null);

const Stable = (props: any) => {
	const [state, setState] = useState();
	useEffect(() => {
		storage("teste", state)
	}, [state])
	const cardsIconSize = 62;
	const cards = useMemo(
		() => [
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
		],
		[]
	);
	if (props.isInput == false) {
		return (
		<DataContext.Provider value={{ state, setState }}>
			<CreateCards cards={cards} />
		</DataContext.Provider>
	);
	}
};

function Create() {
	const MotionFlex = motion.create(Flex);
	const [state, seState] = useState(storage("teste"))
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
					<Stable isInput={false} />
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
					</MotionFlex>
			</Flex>
		</Flex>
	);
}

export default Create;
