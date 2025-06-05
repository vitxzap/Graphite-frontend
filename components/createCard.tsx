"use client";
import { Card, Field, Flex, Input, Select, createListCollection, Portal } from "@chakra-ui/react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useCardContext } from "@/app/context/cardContext";
import { cardInfo } from "@/app/context/cardType";
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
	const frameworks = createListCollection({
		items: [
			{ label: "React.js", value: "react" },
			{ label: "Vue.js", value: "vue" },
			{ label: "Angular", value: "angular" },
			{ label: "Svelte", value: "svelte" },
		],
	});
	const { card }: undefined | cardInfo = useCardContext();
	const [selectedCard, setSelectedCard] = useState<cardInfo | undefined>(undefined);
	useEffect(() => {
		console.log(card);
		setSelectedCard(card);
	}, [card]);
	return (
		<MotionFlex
			w="full"
			gapY="4"
			flexWrap="wrap"
			justifyContent="space-between"
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{
				duration: 0.1,
				scale: { type: "spring", visualDuration: 0.1, bounce: 0.1 },
			}}>
			{selectedCard?.defaultInput.map((item) => {
				return (
					<Field.Root maxW="45%">
						<Field.Label>{item.title}</Field.Label>
						<Input type={item.type} size="xl" w="100%" />
					</Field.Root>
				);
			})}{" "}
			{selectedCard?.selectInput != null
				? selectedCard?.selectInput.map((item) => {
						return (
							<Select.Root collection={frameworks} maxW="45%" size="lg">
								<Select.Label>{item.title}</Select.Label>
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
											{frameworks.items.map((framework) => (
												<Select.Item item={framework} key={framework.value}>
													{framework.label}
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
		</MotionFlex>
	);
}

export { CreateCards, CreateInput };
