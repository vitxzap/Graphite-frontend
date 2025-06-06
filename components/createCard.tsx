"use client";
import { Card, Field, Flex, Input, Select, createListCollection, For, Dialog, Button, Portal, CloseButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCardContext } from "@/app/context/cardContext";
import { cardInfo, insertData } from "@/app/types/types";
import { useForm } from "react-hook-form";
import DialogButton from "./dialogButton";
function CreateCards(props: any) {
	const cards = props.cards;
	const { setCard } = useCardContext();
	const [isSelected, setIsSelected] = useState<string>();
	return cards.map((item: any) => {
		return (
			<Card.Root
				backgroundColor={`${isSelected == item.title ? "#dedede" : ""}`}
				transitionDuration={"fast"}
				onClick={() => {
					setCard(item);
					setIsSelected(item.title);
				}}
				paddingY="2"
				cursor="pointer"
				key={item.title}>
				<Card.Body gap="3">
					{item.icon}
					<Card.Title fontSize="2xl" fontWeight="bolder">
						{item.title}
					</Card.Title>
					<Card.Description fontSize="md" maxWidth="10/12">
						{item.description}
					</Card.Description>
				</Card.Body>
			</Card.Root>
		);
	});
}

function CreateInput() {
	const { register, handleSubmit, reset } = useForm<insertData>();
	const onSubmit = handleSubmit((data) => console.log(data));

	const { card }: cardInfo = useCardContext();
	const [selectedCard, setSelectedCard] = useState<cardInfo | undefined>(undefined);
	const items = createListCollection({
		items: [
			{ name: "item 1", id: 1, value: "item 1" },
			{ name: "item 2", id: 2, value: "item 2" },
			{ name: "item 3", id: 3, value: "item 3" },
		],
	});
	useEffect(() => {
		setSelectedCard(card);
		reset();
	}, [card]);

	return (
			<form onSubmit={onSubmit} style={{display: "flex", width:"100%", flexWrap:"wrap", rowGap: "4", justifyContent: "space-between"}} >
				<For each={selectedCard?.defaultInput}>
					{(item) => (
						<Field.Root maxW="45%">
							<Field.Label fontSize="md">{item.title}</Field.Label>
							<Input type={item.type} size="xl" w="100%" {...register(item.value)} />
						</Field.Root>
					)}
				</For>
				<For each={selectedCard?.selectInput}>
					{(item) => (
						<Select.Root collection={items} maxW="45%" size="lg">
							<Select.HiddenSelect />
							<Select.Label fontSize="md">{item.title}</Select.Label>
							<Select.Control>
								<Select.Trigger>
									<Select.ValueText placeholder="Selecione" />
								</Select.Trigger>
								<Select.IndicatorGroup>
									<Select.Indicator />
								</Select.IndicatorGroup>
							</Select.Control>
							<Portal>
								<Select.Positioner>
									<Select.Content>
										{items.items.map((item: any) => (
											<Select.Item item={item.name} key={item.id}>
												{item.name}
												<Select.ItemIndicator />
											</Select.Item>
										))}
									</Select.Content>
								</Select.Positioner>
							</Portal>
						</Select.Root>
					)}
				</For>
				<Flex w="100%" justifyContent={"flex-end"} marginTop="4">
					{selectedCard != undefined ? (
						<Button type="submit">Criar {selectedCard.title?.toLowerCase()}</Button>
					) : (
						""
					)}
				</Flex>
			</form>
	);
}

export { CreateCards, CreateInput };
