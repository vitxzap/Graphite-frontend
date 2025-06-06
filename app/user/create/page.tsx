import { Flex } from "@chakra-ui/react";
import Header from "../../../components/header";
import { CreateCards, CreateInput } from "@/components/createCard";
import { CardProvider } from "@/app/context/cardContext";
import { cards } from "./variables";
export default function Create() {
	return (
		<CardProvider>
			<Flex height="vh" maxW="vw" width="vw" direction="column" overflowX="hidden">
				<Header />
				<Flex direction="column" height="100svh" align="center" paddingX="18" paddingY="12" gapY="6">
					<Flex
						gap="3"
						maxW="10/12"
						justifyContent="space-around">
						<CreateCards cards={cards} />
					</Flex>
					<Flex
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
					</Flex>
				</Flex>
			</Flex>
		</CardProvider>
	);
}
