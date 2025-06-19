import { Flex, Button, Card, Center, Field, Stack, Input, Heading } from "@chakra-ui/react";
import Header from "../../../components/header"

export default function Home() {
    return (
        <Flex height="dvh" maxW="vw" w="vw" direction="column" >
            <Header />
            <Center style={{height: "100%"}}>
                <Heading size={"6xl"} >Under construction</Heading>
            </Center>
        </Flex>
    );    
}