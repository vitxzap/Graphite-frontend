import { Flex } from "@chakra-ui/react";
import { BiCloud, BiTv, BiUser, BiError } from "react-icons/bi";
import Header from "../../../components/header";
import { CreateCards, CreateInput } from "@/components/createCard";
import { motion } from "motion/react";
import { CardProvider } from "@/app/context/cardContext";
import { cardInfo } from "@/app/context/cardType";
import { host, server } from "@/app/api/searchingData";
import { MotionFlex } from "@/components/chakra-motion";
async function Create() {
	const cardsIconSize = 62;
	const hosts = await host.get();
	const cards: cardInfo = [
		{
			title: "Novo host",
			id: 1,
			defaultInput: [
				{ title: "Nome do host", type: "text" },
				{ title: "Descrição do Host", type: "text" },
			],
			icon: <BiTv size={cardsIconSize} />,
			description: "Crie um novo host e o detalhe corretamente para resoluções mais precisas.",
		},
		{
			title: "Novo server",
			id: 2,
			defaultInput: [{ title: "Nome do server", type: "text" }],
			selectInput: [{ title: "Pertence ao Host:", filter: "host", type: "text" }],
			icon: <BiCloud size={cardsIconSize} />,
			description: "Crie um novo server e o detalhe corretamente para resoluções mais precisas.",
		},
		{
			title: "Novo cliente",
			id: 3,
			defaultInput: [
				{ title: "Nome do cliente", type: "text" },
				{ title: "Id do cliente", type: "number" },
			],
			selectInput: [
				{ title: "Pertence ao host:", filter: "host", type: "text" },
				{ title: "Pertence ao server:", filter: "server", type: "text" },
			],
			icon: <BiUser size={cardsIconSize} />,
			description: "Crie um novo cliente e o detalhe corretamente para resoluções mais precisas.",
		},
		{
			title: "Novo problema",
			id: 4,
			defaultInput: [{ title: "Problema", type: "text" }],
			textarea: [{ title: "Descrição/solução", type: "text" }],
			selectInput: [
				{ title: "Pertence ao host:", type: "text", filter: "host" },
				{ title: "Pertence ao server:", type: "text", filter: "server" },
				{ title: "Pertence ao cliente:", type: "text", filter: "client" },
			],
			icon: <BiError size={cardsIconSize} />,
			description: "Detalhe um problema para que sua resolução seja cada vez mais rápida e otimizada.",
		},
	];
	return (
		<CardProvider>
			<Flex height="vh" maxW="vw" width="vw" direction="column" overflowX="hidden">
				<Header />
				<Flex direction="column" height="100svh" align="center" paddingX="18" paddingY="12" gapY="6">
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
						<CreateCards cards={cards} />
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
						<CreateInput />
					</MotionFlex>
				</Flex>
			</Flex>
		</CardProvider>
	);
}

export default Create;
