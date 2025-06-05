"use client";
import { Card, Field, Flex, Input, Select, createListCollection, Portal, Dialog, Button, CloseButton } from "@chakra-ui/react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useCardContext } from "@/app/context/cardContext";
import { cardInfo } from "@/app/context/cardType";
import { fetchHost } from "@/app/api/searchingData";
const data = await fetchHost();
function CreateCards(props: any) {
	const cards = props.cards;
	const { setCard } = useCardContext();
	const MotionCard = motion.create(Card.Root);
	const [isSelected, setIsSelected] = useState<string>();
	return cards.map((item: any) => {
		return (
			<MotionCard
				backgroundColor={`${isSelected == item.title ? "#dedede" : ""}`}
				transitionDuration={"fast"}
				onClick={() => {
					setCard(item);
					setIsSelected(item.title);
				}}
				paddingY="2"
				cursor="pointer"
				key={item.title}
				whileTap={{ scale: 0.9 }}
				whileHover={{ scale: 1.025, backgroundColor: "#dedede" }}>
				<Card.Body gap="3">
					{item.icon}
					<Card.Title fontSize="2xl" fontWeight="bolder">
						{item.title}
					</Card.Title>
					<Card.Description fontSize="md" maxWidth="10/12">
						{item.description}
					</Card.Description>
				</Card.Body>
			</MotionCard>
		);
	});
}

function CreateInput() {
	const MotionFlex = motion.create(Flex);
	const frameworks = createListCollection({items: data.data});
	const { card }: undefined | cardInfo = useCardContext();
	const [selectedCard, setSelectedCard] = useState<cardInfo | undefined>(undefined);
	const [value, setValue] = useState("Selecione");
	useEffect(() => {
		setSelectedCard(card);
	}, [card]);
	return (
		<MotionFlex
			w="full"
			gapY="4"
			flexWrap="wrap"
			justifyContent="space-between">
			{selectedCard?.defaultInput.map((item) => {
				return (
					<Field.Root maxW="45%">
						<Field.Label fontSize="md">{item.title}</Field.Label>
						<Input type={item.type} size="xl" w="100%" />
					</Field.Root>
				);
			})}{" "}
			{selectedCard?.selectInput != null
				? selectedCard?.selectInput.map((item) => {
						return (
							<Select.Root collection={frameworks} maxW="45%" size="lg" value={value} onValueChange={(e) => setValue(e.value)} >
								<Select.Label fontSize="md">{item.title}</Select.Label>
								<Select.Control>
									<Select.Trigger>
										<Select.ValueText placeholder={value} />
									</Select.Trigger>
									<Select.IndicatorGroup>
										<Select.Indicator />
									</Select.IndicatorGroup>
								</Select.Control>
								<Portal>
									<Select.Positioner>
										<Select.Content>
											{frameworks.items.map((framework) => (
												<Select.Item item={framework.name} key={framework.id}>
													{framework.name}
													<Select.ItemIndicator />
												</Select.Item>
											))}
										</Select.Content>
									</Select.Positioner>
								</Portal>
							</Select.Root>
						);
					})
				: ""}
			<Flex w="100%" justifyContent={"flex-end"}>
				{selectedCard != undefined ? (
					<Dialog.Root>
						<Dialog.Trigger asChild>
							<Button size="lg">Continuar</Button>
						</Dialog.Trigger>
						<Portal>
							<Dialog.Backdrop />
							<Dialog.Positioner>
								<Dialog.Content>
									<Dialog.Header>
										<Dialog.Title>Confirmar criação</Dialog.Title>
									</Dialog.Header>
									<Dialog.Body>
										<p>
											Tem certeza que deseja criar a instância com os valores preenchidos? Certifique-se de ter preenchido os campos corretamente para evitar erros de consultar
											no futuro.
										</p>
									</Dialog.Body>
									<Dialog.Footer>
										<Dialog.ActionTrigger asChild>
											<Button variant="outline">Vou revisar</Button>
										</Dialog.ActionTrigger>
										<Dialog.ActionTrigger>
											<Button onClick={() => {}}>Criar instância</Button>
										</Dialog.ActionTrigger>
									</Dialog.Footer>
									<Dialog.CloseTrigger asChild>
										<CloseButton size="sm" />
									</Dialog.CloseTrigger>
								</Dialog.Content>
							</Dialog.Positioner>
						</Portal>
					</Dialog.Root>
				) : (
					""
				)}
			</Flex>
		</MotionFlex>
	);
}

export { CreateCards, CreateInput };
