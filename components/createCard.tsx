"use client";
import { Card, Image, CardRoot, ConditionalValue } from "@chakra-ui/react";
import { motion, MotionValue } from "motion/react";
import { useEffect, useState } from "react";
export default function CreateCards(props: any) {
	const cards = props.cards;
	const MotionCard = motion(Card.Root);
	const [isSelected, setIsSelected] = useState<string>();
	function setSelectedCard(title: string) {
		if (title == isSelected) {
			return { backgroundColor: "#dedede", };
		}
	}
	return cards.map((item: any) => {
		return (
			<MotionCard
				style={setSelectedCard(item.title)}
				transitionDuration={"fast"}
				onClick={() => {
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
