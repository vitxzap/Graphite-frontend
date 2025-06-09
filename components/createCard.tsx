"use client";
import { Card, Field, Flex, Input, Select, createListCollection, For, Dialog, Button, Portal, CloseButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCardContext } from "@/app/context/cardContext";
import { cardInfo, insertData } from "@/app/types/types";
import { useForm } from "react-hook-form";
import CreateSelectInput from "./createSelectInput";
import storage from "local-storage";
import axios from "axios";
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
					storage("hostId", null);
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
	const onSubmit = handleSubmit((data) => {
		async function post() {
			if (selectedCard?.title == "Novo host") {
				const res = await fetch("/api/host", {
					method: "POST",
					body: JSON.stringify({
						value: data.name
					})
				});
				const response = await res.json();
				return response;
			}
		}
		post();
	});
	const { card }: cardInfo = useCardContext();
	const [selectedCard, setSelectedCard] = useState<cardInfo | undefined>(undefined);
	useEffect(() => {
		setSelectedCard(card);
		reset();
	}, [card]);
	return (
		<form onSubmit={onSubmit} style={{ display: "flex", width: "100%", flexWrap: "wrap", rowGap: "4", justifyContent: "space-between" }}>
			<For each={selectedCard?.defaultInput}>
				{(item) => (
					<Field.Root maxW="45%" key={item.value}>
						<Field.Label fontSize="md">{item.title}</Field.Label>
						<Input type={item.type} size="xl" w="100%" {...register(item.value)} />
					</Field.Root>
				)}
			</For>
			<For each={selectedCard?.selectInput}>{(item) => <CreateSelectInput data={item} key={item.value} />}</For>
			<Flex w="100%" justifyContent={"flex-end"} marginTop="4">
				{selectedCard != undefined ? <Button type="submit">Criar {selectedCard.title?.toLowerCase()}</Button> : ""}
			</Flex>
		</form>
	);
}

export { CreateCards, CreateInput };
