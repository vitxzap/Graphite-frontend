"use client"
import { Flex, Button, Card, Center, Field, Stack, Input, } from "@chakra-ui/react";
import { PasswordInput, PasswordStrengthMeter } from "@/components/ui/password-input";
import { RiArrowRightLine } from "react-icons/ri";
import { useState } from "react";
export default function Home() {
  const [password, setPassword] = useState<any>();
	return (
		<Center h="vh" bg="white" color="black">
			<Card.Root maxW="" >
				<Card.Header>
					<Card.Title fontSize="xl">Entrar no sistema</Card.Title>
					<Card.Description>Preencha os dados para acessar o site.</Card.Description>
				</Card.Header>
				<Card.Body>
					<Stack gap="4" w="full" >
						<Field.Root>
							<Field.Label>E-mail</Field.Label>
							<Input size="lg" w="md" type="email" />
						</Field.Root>
						<Field.Root>
							<Field.Label>Senha</Field.Label>
              <PasswordInput size="lg" w="md" value={password} onChange={(e) => setPassword(e.target.value)} />
						</Field.Root>
					</Stack>
				</Card.Body>
				<Card.Footer justifyContent="flex-end">
					<Button variant="solid">
						Entrar <RiArrowRightLine />
					</Button>
				</Card.Footer>
			</Card.Root>
		</Center>
	);
}
