import { Card, Image } from "@chakra-ui/react";

export default function CreateCards(props: any) {
	const cards = props.cards;
    return cards.map((item: any) => {
        return (
            <Card.Root paddingY="2" cursor="pointer" >
                <Card.Body gap="3">
                    {item.icon}
                    <Card.Title fontSize="2xl" fontWeight="bolder">{item.title}</Card.Title>
                    <Card.Description fontSize="md" maxWidth="10/12">{item.description}</Card.Description>
                </Card.Body>
            </Card.Root>
        );
    });
}
