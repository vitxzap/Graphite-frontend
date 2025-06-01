import { Flex, Button, Card, Center, Field, Stack, Input, Avatar } from "@chakra-ui/react";
import { BiCloud, BiTv, BiUser, BiError } from "react-icons/bi";
import Header from "../../../components/header";
import CreateCards from "@/components/createCard";

export default function Create() {
	const cardsIconSize = 62;
	return (
		<Flex height="vh" maxW="vw" width="vw" direction="column" overflowX="hidden">
			<Header />
			<Flex direction="column" height="100svh" align="center" paddingX="18" paddingY="6">
				<Flex gap="3" maxW="10/12" justifyContent="space-around">
					<CreateCards
						cards={[
							{
								title: "Novo host",
								icon: <BiTv size={cardsIconSize} />,
								description: "Crie um novo host e o detalhe corretamente para resoluções mais precisas.",
							},
							{
								title: "Novo server",
								icon: <BiCloud size={cardsIconSize} />,
								description: "Crie um novo server e o detalhe corretamente para resoluções mais precisas.",
							},
							{
								title: "Novo cliente",
								icon: <BiUser size={cardsIconSize} />,
								description: "Crie um novo cliente e o detalhe corretamente para resoluções mais precisas.",
							},
							{
								title: "Novo problema",
								icon: <BiError size={cardsIconSize} />,
								description: "Detalhe um problema para que sua resolução seja cada vez mais rápida e otimizada.",
							},
						]}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
}
