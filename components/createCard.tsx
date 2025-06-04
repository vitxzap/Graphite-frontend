"use client";
import { Card, Flex, Field, Input } from "@chakra-ui/react";
import { motion } from "motion/react";
import { createContext, useContext, useEffect, useState } from "react";
import { DataContext } from "@/app/user/create/page";

function CreateCards({ cards }) {
	const MotionCard = motion.create(Card.Root);
	const [isSelected, setIsSelected] = useState<string>();
	const { state, setState } = useContext(DataContext)
	useEffect(() => {

	}, [state])
	return cards.map((item: any) => {
		return (
			<MotionCard
				backgroundColor={`${isSelected == item.title ? "#dedede" : ""}`}
				transitionDuration={"fast"}
				onClick={() => {
					setState(item.title)
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

export { CreateCards };
